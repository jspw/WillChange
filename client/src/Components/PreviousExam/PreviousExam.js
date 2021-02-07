import React, { useEffect, useState } from "react";

import {
  Button,
  Col,
  Container,
  Row,
  Modal,
  Form,
  Spinner,
  Card,
  Alert,
  Jumbotron,
  Table,
} from "react-bootstrap";

import axios from "axios";

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  CardContent,
  CardHeader,
  List,
  ListItem,
  Menu,
  MenuList,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router-dom";

const PreviousExam = (props) => {
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const { id } = useParams();

  const userId = props.userInfo._id;

  const role = props.userInfo.role;

  const [mcqExamData, setmcqExamData] = useState(null);
  const [cqExamData, setcqExamData] = useState(null);

  useEffect(() => {
    axios
      .get(`${role}/exam/mcq/submit/${id}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.status == "OK")
          setmcqExamData(response.data.result.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${role}/exam/cq/submit/${id}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.status == "OK")
          setcqExamData(response.data.result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let mcq;
  let cq;

  if (mcqExamData)
    mcq = mcqExamData.studentAnswers.map((test) => {
      return (
        <din>
          <Card>
            <Jumbotron>
              <Typography>{test.mcqQuestion.description}</Typography>
              {/* <Alert variant="primary"> */}
              <Typography>{test.mcqQuestion.mainQuestion}</Typography>
              {/* </Alert> */}
            </Jumbotron>

            <CardContent>
              <MenuList>
                {test.mcqQuestion.options.map((op) => {
                  if (test.mcqQuestion.correctAnswers[0].answer === op.option)
                    return <Alert variant="success">{op.option}</Alert>;
                  if (test.studentAnswer === op.option)
                    return <Alert variant="danger">{op.option}</Alert>;

                  return <MenuItem>{op.option}</MenuItem>;
                })}
              </MenuList>
            </CardContent>
          </Card>
          <br></br>
        </din>
      );
    });

  if (cqExamData)
    cq = cqExamData.studentAnswers.map((test) => {
      return (
        <din>
          <Card>
            <Jumbotron>
              <Typography>{test.cqQuestion.description}</Typography>
              {/* <Alert variant="primary"> */}
              <Typography>{test.cqQuestion.mainQuestion}</Typography>
              {/* </Alert> */}
            </Jumbotron>

            <CardContent>
              <Alert variant="success">{test.studentAnswer}</Alert>
            </CardContent>
          </Card>
          <br></br>
        </din>
      );
    });

  if (mcqExamData || cqExamData)
    return (
      <Container style={{ marginTop: "5px" }}>
        <Alert variant="light">
          <h1 className="text-center">
            {mcqExamData ? mcqExamData.mcqExam.name : cqExamData.cqExam.name}
          </h1>
        </Alert>

        <Row>
          <Col>
            <Row>
              <Col>
                <Table
                  // variant="dark"
                  responsive
                  hover
                  bordered
                  size="sm"
                  bsPrefix="table"
                >
                  <tbody>
                    <tr>
                      <td>Participated On</td>
                      <td>
                        {new Date(
                          mcqExamData
                            ? mcqExamData.submitOn
                            : cqExamData.submitOn
                        ).getDate()}
                        th{" "}
                        {
                          months[
                            new Date(
                              mcqExamData
                                ? mcqExamData.submitOn
                                : cqExamData.submitOn
                            ).getMonth()
                          ]
                        }
                        ,
                        {new Date(
                          mcqExamData
                            ? mcqExamData.submitOn
                            : cqExamData.submitOn
                        ).getFullYear()}{" "}
                        (
                        {
                          days[
                            new Date(
                              mcqExamData
                                ? mcqExamData.submitOn
                                : cqExamData.submitOn
                            ).getDay()
                          ]
                        }
                        )
                      </td>
                    </tr>
                    <tr>
                      <td>At</td>
                      <td>
                        {new Date(
                          mcqExamData
                            ? mcqExamData.mcqExam.date
                            : cqExamData.cqExam.date
                        ).getHours() < 10
                          ? "0" +
                            new Date(
                              mcqExamData
                                ? mcqExamData.mcqExam.date
                                : cqExamData.cqExam.date
                            ).getHours()
                          : new Date(
                              mcqExamData
                                ? mcqExamData.mcqExam.date
                                : cqExamData.cqExam.date
                            ).getHours()}
                        :
                        {new Date(
                          mcqExamData
                            ? mcqExamData.mcqExam.date
                            : cqExamData.cqExam.date
                        ).getMinutes() < 10
                          ? "0" +
                            new Date(
                              mcqExamData
                                ? mcqExamData.mcqExam.date
                                : cqExamData.cqExam.date
                            ).getMinutes()
                          : new Date(
                              mcqExamData
                                ? mcqExamData.mcqExam.date
                                : cqExamData.cqExam.date
                            ).getMinutes()}{" "}
                      </td>
                    </tr>
                    <tr>
                      <td>Total Time</td>
                      <td>
                        {mcqExamData
                          ? mcqExamData.mcqExam.totalTime
                          : cqExamData.cqExam.totalTime}{" "}
                        min
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>

          <Col>
            <Row>
              <Col></Col>
              <Col>
                <Table
                  // variant="dark"
                  responsive
                  hover
                  bordered
                  size="sm"
                  bsPrefix="table"
                >
                  <tbody>
                    <tr>
                      <td>Total Marks</td>
                      <td>
                        {mcqExamData ? mcqExamData.mark : cqExamData.mark}/
                        {mcqExamData
                          ? mcqExamData.mcqExam.totalMarks
                          : cqExamData.cqExam.totalMarks}
                      </td>
                    </tr>

                    <tr>
                      <td>Solved</td>
                      <td>{mcqExamData ? mcqExamData.solved : ""}</td>
                    </tr>

                    <tr>
                      <td>Wrong</td>
                      <td>{mcqExamData ? mcqExamData.wrong : ""}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col></Col>

          <Col></Col>
        </Row>
        {mcq ? mcq : cq}
      </Container>
    );
  else return <CircularProgress />;
};

export default PreviousExam;