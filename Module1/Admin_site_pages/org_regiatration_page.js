import {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import vesting_contract_abi from "c:/Users/Lost~Wonderer/VS Code/Solidity/advance evm/module 1/practice me final assessment/simple one/vesting_app/artifacts/contracts/vestingProcess.sol/TokenVesting.json"

export default function org_regiatration_page() {
    
    const [account,setAccount] = useState(undefined);
    const [ethwallet,setEthallet] = useState(undefined);
    const [info,setInfo] = useState(undefined);
    const [ error,setError ] = useState(undefined);
    const [smartcontract,setSmartcontract] = useState(undefined);
    const [Organization_name,setOrganization_name] = useState(undefined);
    const [Organization_access_level,setOrganization_access_level] = useState(undefined);
    const [Organization_Token_name,setOrganization_Token_name] = useState(undefined);
    const [Organization_token_abbreviation,setOrganization_token_abbreviation] = useState(undefined);
    const [Organization_token_totall_supply,setOrganization_token_totall_supply] = useState(undefined);

    const contract_ABI = vesting_contract_abi.abi;
    const contract_address = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    let num = 0;



    const initprocess = async () => {
        
        if(window.ethereum){
            setEthallet(window.ethereum);
            console.log(`Ethereum instance found`);
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

    const organization_registrationHandler = async () => {
        smartcontractConnectionHandler();
        if(smartcontract){
            const value = await smartcontract.msgg();
            console.log(`here is the output of user account address msgg ${value} user account Organization_token_totall_supply ${ethers.BigNumber.from(Organization_token_totall_supply)} `);
            const value1 = await smartcontract._mint(account,Organization_name, Organization_Token_name, Organization_token_abbreviation, ethers.BigNumber.from(Organization_token_totall_supply));
            console.log(`here is the output of setowner ${value1}`);

        }
        //let flag= await smartcontract._mint(Organization_name,Organization_Token_name,Organization_token_abbreviation,Organization_token_totall_supply);
        //console.log(`the output of _mint ${flag}`);
    }


    const readInputs = async (text,option) => {
        if(option == '1'){
            setOrganization_name(text);
        }
        if(option == '2'){
            setOrganization_Token_name(text);
        }
        if(option == '3'){
            setOrganization_token_abbreviation(text);
        }
        if(option == '4'){
            setOrganization_token_totall_supply(text);
        }
        setInfo("Please Re_check your Entered information.");
    }

    const InfoCheck = async () => {
        smartcontractConnectionHandler();
        if(smartcontract){ 
            const [access_level,Organization_name,Organization_Token_name,Organization_token_abbreviation,Organization_token_totall_supply,adminBalance] = await smartcontract._show_organization_details(account);
            setOrganization_access_level(parseInt(access_level));
            setOrganization_name(Organization_name);
            setOrganization_Token_name(Organization_Token_name);
            setOrganization_token_abbreviation(Organization_token_abbreviation);
            setOrganization_token_totall_supply(parseInt(Organization_token_totall_supply));
        }
        return 1;
    }

    const showRecord = () => {
        if( Organization_access_level > 0){
            return(<>
                <div>
                    <p>Organization Access_level = {Organization_access_level}</p>
                    <p>Organization Name is = {Organization_name}</p>
                    <p>Organization Token Name is = {Organization_Token_name}</p>
                    <p>Organization Token Abbreviationis = {Organization_token_abbreviation}</p>
                    <p>Organization Token Totall Supply is = {Organization_token_totall_supply}</p>
                </div>
            </>)
        }
    }

    const walletconnectbutton = () => {
        if(account == undefined){
            return (<>
                <div>
                    <button onClick={walletConnectionHandler}>Connect Walltet</button>
                </div>
            </>);
        } else {
            return (<>
                <div>Click on Check to see Your Organization details associated with Current Account =
                    <button onClick={() => InfoCheck()}>Check your Account Details</button>
                </div>
            </>)
        }
    }

    useEffect(() => {
        initprocess();
    },[])


    return (
        <>
            <div>
                <h1>Welcome to Organization Registration Page</h1>
                <h1> {info} {error}</h1>
                {walletconnectbutton()}
                {showRecord()}
                <h1></h1>
                
                <div>
                    <p>Enter Your Organization Name</p>
                    <input onChange={(e) => readInputs(e.target.value,1)}/>
                    <p>Enter Your Token Name</p>
                    <input onChange={(e) => readInputs(e.target.value,2)}/>
                    <p>Enter Your Token Abbreviation</p>
                    <input onChange={(e) => readInputs(e.target.value,3)}/>
                    <p>Enter Your Token Totall Supply</p>
                    <input onChange={(e) => readInputs(e.target.value,4)}/>
                </div>
                <div>
                    <button onClick={() => organization_registrationHandler() }>Register Your Organization</button>
                </div>
                <h3 >Your account Address is {account} </h3>
                <a href="/"> Go to Index </a><br></br>
                <a href="/orga_admin/org_admin_front_end" > Go to Admin side</a>
            </div>
        </>
    );
}