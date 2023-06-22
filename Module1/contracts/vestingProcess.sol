// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract TokenVesting {
    
    uint256 public id=0;
    uint256 public number_client =0 ;



    mapping(address => mapping(address => uint256)) public level_of_access; // it is used to identify whether one is an admin or an client
    mapping(address => mapping(address => uint256)) public Balance; // its the total amount of token one has 
    mapping(address => mapping(address => uint256)) public TolallSupply; // its the total amount of token minted by the organization
    mapping(address => mapping(address => uint256)) public unlock_time;
    mapping(address => string) public org_name; // its maintaining a list of names associated with its organization account address
    mapping(address => string) public org_token_name;
    mapping(address => string) public org_token_abbre;
    mapping(address => mapping(uint256 => address)) public client_address_list; // its maintaining a list of names associated with its client account address
    mapping(address => mapping(uint256 => string)) public client_name_list;
    mapping(address => mapping(address => uint256)) public client_id_list;
    mapping(address => mapping(address => string)) public whitelist_state;


    event mint(string orgname,string token_name,string token_abbre,address admin_addresss, uint256 Total_supply);
    event withdraw(address client, uint256 quantity);
    event holder_enlistment(address owner, address client,string name);
    event show_org_details(address org,string orgname,string token_name,string token_abbre,uint256 bal,uint256 totall_token);
    event show_client_details(uint256 shakeholder,string client_name,uint256 client_bal,uint256 access_level);

    // here the shakeholder is a uint. it defines the type of the shakeholder is the token holder 
    // 1 for 

    function msgg()public view returns(address){
        return msg.sender;
    }

    function accessLevel(address orga,address client)public view returns(uint256){
        return level_of_access[orga][client];
    }

    // here i am going to quiquely give client an id to differentiate client between orgs
    function _holder_enlistment(address orga,address client, string memory client_name,uint256 access_level) public returns(bool) { 
        bool flag = false;
        address Owner = orga;
        id +=1;
        number_client +=1;
        level_of_access[Owner][client] = access_level;
        Balance[Owner][client] = 0;
        client_address_list[Owner][number_client] = client;
        client_name_list[Owner][number_client] = client_name;
        client_id_list[Owner][client]=number_client;
        emit holder_enlistment(Owner,client,client_name);
        return flag = true;
    }

    function _get_my_id(address organization,address client)public view returns(uint256){
        return client_id_list[organization][client];
    }

    function _show_client_info(address organization,address client, uint256 client_id)public view returns(uint256,string memory, uint256,uint256) {

        return (level_of_access[organization][client], client_name_list[organization][client_id],Balance[organization][client],unlock_time[organization][client]);
    }


    function _allot_token(address orga,address client,uint256 qty, uint256 time) public returns(bool) {
        bool flag = false;
        address Owner = orga;
        uint previousBal = Balance[Owner][client];
        uint org_previousBal = Balance[Owner][Owner];
        unlock_time[Owner][client] = time;
        Balance[Owner][client] += qty;
        Balance[Owner][Owner] -= qty;
        if((previousBal+qty) == Balance[Owner][client] ){
            if((org_previousBal-qty) == Balance[Owner][client] ){
                flag = true;
            }
        } else {
            revert("Token allotment faild as balance mismatched");
        }
        return flag= true;
    }

    function _mint(address orga,string memory organame,string memory token_name,string memory abre,uint256 qty) public returns(bool){
        address Owner = orga;
        uint previousBal = Balance[Owner][Owner];
        bool flag = false;
        level_of_access[Owner][Owner] = 1;
        org_name[Owner] = organame;
        org_token_name[Owner]= token_name;
        org_token_abbre[Owner]= abre;
        TolallSupply[Owner][Owner] +=qty;
        Balance[Owner][Owner] += qty;

        if((previousBal+qty) == Balance[Owner][Owner]){
            flag = true;
        } else {
            revert("minting faild");
        }
        emit mint(org_name[Owner],org_token_name[Owner], org_token_abbre[Owner],Owner,qty);
        return flag;
    }

    function _show_organization_details(address orga) public view returns(uint256,string memory,string memory,string memory,uint256,uint256) {
        address Owner = orga;
        return ( level_of_access[Owner][Owner], org_name[Owner], org_token_name[Owner], org_token_abbre[Owner],TolallSupply[Owner][Owner], Balance[Owner][Owner] );
    }

    function _withdraw(address orga,address client,uint256 qty,uint256 time) public returns(bool){
        uint256 previousBal = Balance[orga][client];
        bool flag = false;

        if(time >= unlock_time[orga][client]){
            Balance[orga][client] -= qty;
                if((previousBal-qty) == Balance[orga][client]){
                    flag = true;
                } else {
                    revert("mismatch account balance");
                }
                emit withdraw(client,qty);
                return flag;
        } else {
            revert("You vesting Period is not over yet!");
        }
        
    }

    function whitelistingManagement(address ora,address client,string memory state) public returns (bool) {

        whitelist_state[ora][client] = state;
        return true;
    }
    function get_client_whitelisting_state(address ora,address client) public view returns (string memory) {

        return whitelist_state[ora][client];
    }

}
