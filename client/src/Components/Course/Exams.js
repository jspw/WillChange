import React from "react";
import { Col, Container, Row, Card, Alert, Table } from "react-bootstrap";
import MenuItem from "@material-ui/core/MenuItem";
import { Box, CardContent, MenuList, Typography } from "@material-ui/core";

import {
  Button,
  Modal,
  Form,
  Spinner,
  Jumbotron,
  Tab,
  TabContainer,
  ListGroup,
  TabContent,
  TabPane,
} from "react-bootstrap";

const Exams = (props) => {
  console.log(props.userInfo.role);

  const exams = [];

  if (props.courseData.cqExams) {
    props.courseData.cqExams.forEach((exam, j) => {
      const date = new Date();
      if (
        new Date(exam.examId.date).getTime() + exam.examId.totalTime * 60 <
        date.getTime()
      )
        exams.push({
          _id: exam.examId._id,
          name: exam.examId.name,
          courseName: props.courseData.name,
          date: new Date(exam.examId.date),
          totalMarks: exam.examId.totalMarks,
          examType: "cq",
          when: "previous",
          totalTime: exam.examId.totalTime,
          createdBy:
            props.courseData.createdBy.firstName +
            props.courseData.createdBy.lastName +
            props.courseData.createdBy.username,
        });
      else {
        exams.push({
          _id: exam.examId._id,
          name: exam.examId.name,
          courseName: props.courseData.name,
          date: new Date(exam.examId.date),
          totalMarks: exam.examId.totalMarks,
          totalTime: exam.examId.totalTime,
          examType: "cq",
          when: "upcoming",
          createdBy:
            props.courseData.createdBy.firstName +
            " " +
            props.courseData.createdBy.lastName +
            " " +
            props.courseData.createdBy.username,
        });
      }
    });
  }

  if (props.courseData.mcqExams) {
    const date = new Date();
    props.courseData.mcqExams.forEach((exam, j) => {
      if (
        new Date(exam.examId.date).getTime() + exam.examId.totalTime * 60 >
        date.getTime()
      )
        exams.push({
          _id: exam.examId._id,
          name: exam.examId.name,
          courseName: props.courseData.name,
          date: new Date(exam.examId.date),
          totalMarks: exam.examId.totalMarks,
          totalTime: exam.examId.totalTime,
          examType: "mcq",
          when: "upcoming",
          createdBy:
            props.courseData.createdBy.firstName +
            " " +
            props.courseData.createdBy.lastName +
            " " +
            props.courseData.createdBy.username,
        });
      else {
        exams.push({
          _id: exam.examId._id,
          name: exam.examId.name,
          courseName: props.courseData.name,
          date: new Date(exam.examId.date),
          totalMarks: exam.examId.totalMarks,
          totalTime: exam.examId.totalTime,
          examType: "mcq",
          when: "previous",
          createdBy:
            props.courseData.createdBy.firstName +
            " " +
            props.courseData.createdBy.lastName +
            " " +
            props.courseData.createdBy.username,
        });
      }
    });
  }

  exams.sort(function (a, b) {
    return b.date.getTime() - a.date.getTime();
  });

  let x = 1;
  const tableBody = exams.map((exam) => {
    console.log(exam);
    return (
      <>
        <tr>
          <td>{x++}</td>
          <td>
            <span class="crown badge" style={{ fontSize: "20px" }}>
              {x == 2 ? "👑" : ""}
            </span>
            {exam.name}
          </td>
          <td>{exam.examType}</td>
          <td>{exam.totalMarks}</td>
          <td>{`${Math.round(exam.totalTime / 60)} min : ${
            exam.totalTime % 60
          } sec`}</td>
          <td>{exam.when}</td>
          <td>{exam.date.toString()}</td>
          {props.userInfo.role === "Teacher" ? (
            <td>
              <Button href={`/examine/cq/${exam._id}`} variant="primary">
                Examine
              </Button>
            </td>
          ) : (
            null
          )}

          <td>
            <Button href={`/${exam.when}-exam/${exam._id}`} variant="info">
              View
            </Button>
          </td>
        </tr>
      </>
    );
  });

  return (
    <table
      className="table table-hover table-striped table-light"
      style={{ textAlign: "center" }}
    >
      <thead className="thead-dark">
        <tr>
          <th>#</th>
          <th>Exam Name</th>
          <th>Exam Type</th>
          <th>Total Marks</th>
          <th>Total Time</th>

          <th>Condition</th>
          <th>Date</th>
          {props.userInfo.role === "Teacher" ? <th>Check</th> : null}
          <th>Action</th>
        </tr>
      </thead>

      <tbody>{tableBody}</tbody>
    </table>
  );
};

export default Exams;