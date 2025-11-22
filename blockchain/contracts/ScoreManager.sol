// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ScoreManager {
    struct Score {
        string studentId; // ID sinh viên trong DB
        string subjectId; // ID môn học
        uint256 value;
    }

    mapping(string => mapping(string => Score)) private scores; // studentId => subjectId => Score
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not allowed");
        _;
    }

    // Giảng viên thêm hoặc cập nhật điểm
    function setScore(
        string memory studentId,
        string memory subjectId,
        uint256 value
    ) public onlyOwner {
        scores[studentId][subjectId] = Score(studentId, subjectId, value);
    }

    // Lấy điểm
    function getScore(string memory studentId, string memory subjectId)
        public
        view
        returns (Score memory)
    {
        Score memory s = scores[studentId][subjectId];
        require(s.value > 0, "Score not found");
        return s;
    }
}
