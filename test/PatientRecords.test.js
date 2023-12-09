const PatientRecords = artifacts.require("PatientRecords");

contract("PatientRecords", (accounts) => {
  let patientRecordsInstance;

  before(async () => {
    patientRecordsInstance = await PatientRecords.deployed();
  });

  it("should add a new patient record", async () => {
    const patientId = 1;
    const name = "John Doe";
    const diagnosis = "Some diagnosis";
    const DRGCode = "ABC123";
    const CPTCode = "XYZ456";

    const result = await patientRecordsInstance.addPatient(
      patientId,
      name,
      diagnosis,
      DRGCode,
      CPTCode,
      { from: accounts[0] }
    );

    assert.equal(result.logs[0].event, "PatientAdded", "PatientAdded event should be emitted");
    assert.equal(result.logs[0].args.patientId.toNumber(), patientId, "PatientId should match");
    assert.equal(result.logs[0].args.name, name, "Name should match");
    assert.equal(result.logs[0].args.diagnosis, diagnosis, "Diagnosis should match");
    assert.equal(result.logs[0].args.DRGCode, DRGCode, "DRGCode should match");
    assert.equal(result.logs[0].args.CPTCode, CPTCode, "CPTCode should match");
  });

  it("should not add an existing patient record", async () => {
    const patientId = 1;
    const name = "Jane Doe";
    const diagnosis = "Another diagnosis";
    const DRGCode = "DEF789";
    const CPTCode = "UVW012";

    try {
      await patientRecordsInstance.addPatient(
        patientId,
        name,
        diagnosis,
        DRGCode,
        CPTCode,
        { from: accounts[0] }
      );
      assert.fail("Expected revert not received");
    } catch (error) {
      assert(error.message.indexOf("revert") >= 0, "Error message should contain revert");
    }
  });
});


contract("PatientRecords", (accounts) => {
  it("should retrieve and print patient records", async () => {
    const patientRecordsInstance = await PatientRecords.deployed();

    // Adding a few patients for testing
    await patientRecordsInstance.addPatient(1, "John Doe", "Fever", "ABC123", "XYZ789");
    await patientRecordsInstance.addPatient(2, "Alice Smith", "Cough", "DEF456", "UVW321");
    // Add more patients as needed for testing

    // Retrieve patient records
    const patientCount = await patientRecordsInstance.patientCount();
    const patientData = [];

    for (let i = 1; i <= patientCount; i++) {
      const patient = await patientRecordsInstance.patients(i);
      patientData.push(patient);
    }

    // Print patient records
    patientData.forEach((patient) => {
      console.log("Patient ID:", patient.patientId.toString());
      console.log("Name:", patient.name);
      console.log("Diagnosis:", patient.diagnosis);
      console.log("DRG Code:", patient.DRGCode);
      console.log("CPT Code:", patient.CPTCode);
      console.log("---------------------------------");
    });
  });
});

