import {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import vesting_contract_abi from "c:/Users/Lost~Wonderer/VS Code/Solidity/advance evm/module 1/practice me final assessment/simple one/vesting_app/artifacts/contracts/vestingProcess.sol/TokenVesting.json"



export default function org_admin_page() {
    
    const [account,setAccount] = useState(undefined);
    const [ethwallet,setEthallet] = useState(undefined);
    const [info,setInfo] = useState(undefined);
    const [ error,setError ] = useState(undefined);
    const [smartcontract,setSmartcontract] = useState(undefined);
    const [client_name,setClient_name] = useState(undefined);
    const [client_address,setClient_address] = useState(undefined);
    const [client_access_level,setClient_access_level] = useState(undefined);
    const [client_balance,setClient_balance] = useState(undefined);
    const [input_client_name,setinput_client_name] = useState(undefined);
    const [input_client_accesslevel,setinput_client_accesslevel] = useState(undefined);

    const contract_ABI = vesting_contract_abi.abi;
    const contract_address = '0x5FbDB2315678afecb367f032d93F642f64180aa3';



    const initprocess = async () => {
        
        if(window.ethereum){
            setEthallet(window.ethereum);
        }
        walletConnectionHandler();
    }

    const walletConnectionHandler = async () => {
        if(ethwallet){
            ethwallet.request({method : "eth_accounts"})
            .then(result => {
                accountHandler(result[0]);
            })
            .catch(error => {setError(error);console.log(error);})
        }
    }
    const accountHandler = async (wal_account) => {
        if(wal_account){
            console.log(`account connected ac is ${wal_account}`);
            setAccount(wal_account);
        } else {
            console.log(`account not found ${wal_account}`);
        }
    }

    const smartcontractConnectionHandler = async () => {
        const provider = new ethers.providers.Web3Provider(ethwallet);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contract_address,contract_ABI,signer);
        setSmartcontract(contract);
    }

    const client_registrationHandler = async () => {
        smartcontractConnectionHandler();
        if(smartcontract){
            const value1 = await smartcontract._holder_enlistment(account,client_address, input_client_name, ethers.BigNumber.from(input_client_accesslevel));
            
        }

    }


    const readInputs = async (text,option) => {
        if(option == '1'){
            setClient_address(text);
        }
        if(option == '2'){
            setinput_client_name(text);
        }
        if(option == '3'){
            setinput_client_accesslevel(text);
        }
        setInfo("Please Re_check your Entered information.");
    }

    const InfoCheck = async () => {
        smartcontractConnectionHandler();
        if(smartcontract){
            let id = await smartcontract._get_my_id(account,client_address);

            const [access_level,client_name,balance] = await smartcontract._show_client_info(account,client_address,ethers.BigNumber.from(id));
            setClient_access_level(parseInt(access_level));
            setClient_name(client_name);
            setClient_balance(parseInt(balance));
        }
        
    }

    useEffect(() => {
        initprocess();
    },[])

    const transactionDetails = () => {
        if(!(client_balance== undefined)){
            return(<>
                    <div>
                        <p> Following Information Found on the Blockchain</p>
                    </div>
                    <div>
                        <p> The client name is set to = {client_name}</p>
                        <p> Client Access_level is set to ={client_access_level}</p>
                        <p> Client Balance is set to ={client_balance}</p>
                    </div>
                </>)
        }
    }

    const elements = () => {
        if (account == undefined) {
            return (<>
                <button onClick={walletConnectionHandler}>Connect Wallet</button>
            </>)
        }
        if (account) {
            return (<>
                <h1>Wallet connected</h1>
                <div>
                    <p>Enter Client Address</p>
                    <input onChange={(e) => readInputs(e.target.value,1)}/>
                    <p>Enter Client Name</p>
                    <input onChange={(e) => readInputs(e.target.value,2)}/>
                    <p>Enter Client Access Level</p>
                    <p>Enter 2-5 is for admin level shakeholders and  Enter 6 - investors 7 to onward for other</p>
                    <input onChange={(e) => readInputs(e.target.value,3)}/>
                </div>
                <div>
                    <button onClick={() => client_registrationHandler() }>Register Client</button>
                    <button onClick={() => InfoCheck()}>Check client Account Details</button>
                </div>
            </>)
        }

    }


    return (
        <>
            <div>

                <h1>Welcome to Admin Client Enlistment page</h1>
                {elements()}<br></br>
                {transactionDetails()}
                <a href="/" > Go to Index </a><br></br>
                <a href="/orga_admin/org_admin_front_end" > Go to Admin side</a><br></br>
            </div>
        </>
    );
}
