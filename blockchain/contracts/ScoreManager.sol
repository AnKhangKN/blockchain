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

    // Events
    event ScoreAdded(string indexed studentId, string indexed subjectId, uint256 value);
    event ScoreUpdated(string indexed studentId, string indexed subjectId, uint256 oldValue, uint256 newValue);

    // Thêm điểm (chỉ thêm khi chưa có điểm)
    function addScore(
        string memory studentId,
        string memory subjectId,
        uint256 value
    ) public {
        require(bytes(studentId).length > 0 && bytes(subjectId).length > 0, "Invalid ids");
        // Nếu đã có điểm (value != 0) thì không được add
        require(scores[studentId][subjectId].value == 0, "Score already exists");

        // Nếu đây là lần đầu thêm subjectId cho studentId thì thêm vào danh sách
        studentSubjects[studentId].push(subjectId);

        scores[studentId][subjectId] = Score(studentId, subjectId, value);
        emit ScoreAdded(studentId, subjectId, value);
    }

    // Cập nhật điểm (chỉ cập nhật khi đã tồn tại trước đó)
    function updateScore(
        string memory studentId,
        string memory subjectId,
        uint256 value
    ) public {
        require(bytes(studentId).length > 0 && bytes(subjectId).length > 0, "Invalid ids");
        // Phải tồn tại điểm trước đó
        uint256 old = scores[studentId][subjectId].value;
        require(old != 0, "Score does not exist");

        scores[studentId][subjectId] = Score(studentId, subjectId, value);
        emit ScoreUpdated(studentId, subjectId, old, value);
    }

    // Cập nhật điểm số
    // (deprecated empty stub removed)

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
