use web3::types::{BlockId, FilterBuilder};
use web3::Web3;

use web3::transports::Http;
use web3::{
    contract::{Contract, Options},
    types::{Address, U256},
};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // HTTP transport to connect to the Ethereum node (Ganache)
    let transport = Http::new("http://localhost:7545")?;

    // Create a Web3 instance using the HTTP transport
    let web3 = Web3::new(transport);

    // Replace the contract address with your deployed smart contract's address
    let contract_address: Address =
        "0x66a450E53dfB81f241350cCE440b9EEEcaDC1cA0".parse().expect("Invalid contract address");

    // Replace ABI with your smart contract's ABI
    let contract_abi = include_bytes!("PatientRecords.json");

    println!("ABI: {:?}", contract_abi);
    println!("Before getting contract");

    // Create an instance of your contract
    let contract = Contract::from_json(
        web3.eth(),
        contract_address,
        contract_abi, // Use contract_abi here
    )?;

    println!("After getting contract");

    // Example: Call a method from your smart contract (replace method name and parameters)
    let result: Vec<U256> = contract
        .query("retrievePatients", (), None, Options::default(), None)
        .await?;

    println!("Data retrieved from the smart contract: {:?}", result);
    for value in &result {
        println!("{}", value);
    }
    
    Ok(())
}
