// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Funds {
    struct Fund {
        string data_cid;
        string fund_id;
    }

    Fund[] public createdFunds;

    function getFunds() public view returns (Fund[] memory) {
        return createdFunds;
    }

    function create(
        string calldata _data_cid,
        string calldata _fund_id
    ) external {
        Fund memory newFund = Fund({data_cid: _data_cid, fund_id: _fund_id});
        createdFunds.push(newFund);
    }
}
