// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GradeSystem {
    // Vai trò
    enum Role { Admin, Teacher, Student }

    struct Grade {
        string subjectCode; // mã môn học từ DB
        uint8 score;        // điểm 0-10
        uint256 timestamp;  // thời gian thêm
    }

    struct User {
        string fullName;
        Role role;
    }

    address public admin;
    mapping(address => User) public users;       // quản lý role blockchain
    mapping(address => Grade[]) private grades;  // lưu lịch sử điểm student

    event GradeAdded(address indexed student, string subjectCode, uint8 score, uint256 timestamp);

    constructor() {
        admin = msg.sender;
        users[admin] = User("Admin", Role.Admin);
    }

    modifier onlyAdmin() {
        require(users[msg.sender].role == Role.Admin, "Not admin");
        _;
    }

    modifier onlyTeacher() {
        require(users[msg.sender].role == Role.Teacher, "Not teacher");
        _;
    }

    // Admin thêm Teacher (sinh viên vẫn do Backend quản lý MongoDB)
    function addTeacher(address _teacher, string memory _name) external onlyAdmin {
        users[_teacher] = User(_name, Role.Teacher);
    }

    // Teacher thêm điểm
    function addGrade(address _student, string memory _subjectCode, uint8 _score) external onlyTeacher {
        require(_score <= 10, "Score must be 0-10");
        grades[_student].push(Grade(_subjectCode, _score, block.timestamp));
        emit GradeAdded(_student, _subjectCode, _score, block.timestamp);
    }

    // Student lấy lịch sử điểm
    function getGrades() external view returns (Grade[] memory) {
        return grades[msg.sender];
    }

    // Teacher/Admin lấy lịch sử điểm của student
    function getStudentGrades(address _student) external view returns (Grade[] memory) {
        require(
            users[msg.sender].role == Role.Admin || users[msg.sender].role == Role.Teacher,
            "Not authorized"
        );
        return grades[_student];
    }
}
