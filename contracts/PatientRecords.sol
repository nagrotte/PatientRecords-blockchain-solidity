// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientRecords {
    // Structure to define a patient
    struct Patient {
        uint256 patientId;
        string name;
        string diagnosis;
        string DRGCode;
        string CPTCode;
        bool exists;
    }

    // Mapping patient ID to Patient details
    mapping(uint256 => Patient) public patients;
    uint256 public patientCount;

    // Event emitted when a new patient record is added
    event PatientAdded(uint256 patientId, string name, string diagnosis, string DRGCode, string CPTCode);

    // Function to add a new patient record
    function addPatient(uint256 _patientId, string memory _name, string memory _diagnosis, string memory _DRGCode, string memory _CPTCode) public {
        require(!patients[_patientId].exists, "Patient already exists");
        
        // Create a new patient record
        Patient memory newPatient = Patient(_patientId, _name, _diagnosis, _DRGCode, _CPTCode, true);
        
        // Add patient to mapping
        patients[_patientId] = newPatient;
        patientCount++;
        
        // Emit event
        emit PatientAdded(_patientId, _name, _diagnosis, _DRGCode, _CPTCode);
    }

    // Function to retrieve all patient records
    function retrievePatients() public view returns (Patient[] memory) {
        Patient[] memory allPatients = new Patient[](patientCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < patientCount; i++) {
            if (patients[i].exists) {
                allPatients[index++] = patients[i];
            }
        }
        
        return allPatients;
    }
}
