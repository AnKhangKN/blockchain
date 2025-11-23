// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ScoreManager {
    struct Score {
        string studentId;
        string subjectId;
        uint256 value;
    }

    mapping(string => mapping(string => Score)) private scores;
    mapping(string => string[]) private studentSubjects; // <-- BỔ SUNG

    // Giảng viên thêm hoặc cập nhật điểm
    function setScore(
        string memory studentId,
        string memory subjectId,
        uint256 value
    ) public {
        // Nếu đây là lần đầu thêm subjectId cho studentId thì thêm vào danh sách
        if (scores[studentId][subjectId].value == 0) {
            studentSubjects[studentId].push(subjectId);
        }

        scores[studentId][subjectId] = Score(studentId, subjectId, value);
    }

    // Lấy điểm 1 môn
    function getScore(
        string memory studentId,
        string memory subjectId
    ) public view returns (Score memory) {
        Score memory s = scores[studentId][subjectId];
        if (s.value == 0) {
            // Trả về điểm 0 thay vì revert
            return Score(studentId, subjectId, 0);
        }
        return s;
    }

    // Lấy toàn bộ điểm của 1 sinh viên theo từng môn học
    function getAllScores(
        string memory studentId
    )
        public
        view
        returns (
            string[] memory subjectIds,
            string[] memory studentIdsList,
            uint256[] memory values
        )
    {
        string[] memory subjects = studentSubjects[studentId];
        string[] memory sIds = new string[](subjects.length);
        uint256[] memory vals = new uint256[](subjects.length);

        for (uint i = 0; i < subjects.length; i++) {
            Score memory s = scores[studentId][subjects[i]];
            sIds[i] = s.studentId;
            vals[i] = s.value;
        }

        return (subjects, sIds, vals);
    }
}
