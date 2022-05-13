import React, { Component } from "react";
import Form from "react-bootstrap/Form";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import "./tabledata.css";
import axios from "axios";

export default class CreateLessons extends Component {
  constructor(props) {
    super(props);
    // Setting up functions
    this.onChangedate = this.onChangedate.bind(this);
    this.onChangedetachment = this.onChangedetachment.bind(this);
    this.onChangesession = this.onChangesession.bind(this);
    this.onChangelevel = this.onChangelevel.bind(this);
    this.onChangesubject1 = this.onChangesubject1.bind(this);

    this.onChangelesson1 = this.onChangelesson1.bind(this);

    this.onChangelesson1tutor = this.onChangelesson1tutor.bind(this);
    this.onChangeequipment = this.onChangeequipment.bind(this);
    this.onChangedress = this.onChangedress.bind(this);
    this.onChangesubject2 = this.onChangesubject2.bind(this);

    this.onChangelesson2 = this.onChangelesson2.bind(this);

    this.onChangelesson2tutor = this.onChangelesson2tutor.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
    this.state = {

      date: new Date(),

      detachment: "",
      session: "",
      level: "",
      subject1: "",

      lesson1: "",

      lesson1tutor: "",
      equipment: "",
      dress: "",
      subject2: "",

      lesson2: "",
      lesson2tutor: "",
      values: [],
      lesson2tutor: "",
    };
  }
  onChangedate(e) {
    this.setState({ date: e.target.value });

  }
  onChangedetachment(e) {
    this.setState({ detachment: e.target.value });
  }
  onChangesession(e) {
    this.setState({ session: e.target.value });
  }
  onChangelevel(e) {
    this.setState({ level: e.target.value });
  }
  onChangesubject1(e) {
    this.setState({ subject1: e.target.value });
  }
  onChangelesson1(e) {
    this.setState({ lesson1: e.target.value });

  }
  onChangelesson1tutor(e) {
    this.setState({ lesson1tutor: e.target.value });
  }
  onChangeequipment(e) {
    this.setState({ equipment: e.target.value });
  }
  onChangedress(e) {
    this.setState({ dress: e.target.value });
  }
  onChangesubject2(e) {
    this.setState({ subject2: e.target.value });
  }

  onChangelesson2(e) {
    this.setState({ lesson2: e.target.value });
  }

  onChangelesson2tutor(e) {
    this.setState({ lesson2tutor: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const items = {
      date: this.state.date,
      detachment: this.state.detachment,
      session: this.state.session,
      level: this.state.level,
      subject1: this.state.subject1,

      lesson1: this.state.lesson1,
      lesson1tutor: this.state.lesson1tutor,
      equipment: this.state.equipment,
      dress: this.state.dress,
      subject2: this.state.subject2,
      lesson2: this.state.lesson2,
      lesson2tutor: this.state.lesson2tutor,
    };
    axios
      .post(
        "http://kgtrainingserver.herokuapp.com/schedule/createschedule",

        items
      )
      .then((res) => console.log(res.data));
    this.setState({
      date: "",
      detachment: "",
      session: "",
      level: "",
      subject1: "",

      lesson1: "",

      lesson1tutor: "",
      equipment: "",
      dress: "",
      subject2: "",

      lesson2: "",
      lesson2tutor: "",
    });
  }

  componentDidMount() {
    fetch("https://kgtrainingserver.herokuapp.com/users")
      .then(function (res) {
        return res.json();
      })
      .then((json) => {
        this.setState({
          values: json,
        });
      });

  }

  render() {
    return (
      <div className="main">
        <div className="form-wrapper">
          <Form onSubmit={this.onSubmit}>
            <div className="formEdit">

              <Form.Group className="datepicker" controlId="date">
                <Form.Label>Date</Form.Label>
                <DatePicker
                  className="text"
                  selected={this.state.date}
                  onChange={this.onChangedate}
                  name="date"
                  dateFormat="dd/MM/yyyy"

                />
              </Form.Group>
              <Form.Group className="text1" controlId="detachment">
                <Form.Label>Detachment</Form.Label>
                <Form.Control
                  className="text"
                  type="text"
                  value={this.state.detachment}
                  onChange={this.onChangedetachment}
                />
              </Form.Group>
              <Form.Group className="text1" controlId="session">
                <Form.Label>Session</Form.Label>
                <Form.Select
                  className="text"

                  selected={this.state.session}

                  value={this.state.session}

                  onChange={this.onChangesession}
                >
                  <option>Select Session</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="text1" controlId="level">
                <Form.Label>Level</Form.Label>

                <Form.Select
                  className="text"
                  selected={this.state.level}
                  onChange={this.onChangelevel}
                >
                  <option value="Basic">Basic</option>
                  <option value="One">One</option>
                  <option value="Two">Two</option>
                  <option value="Three">Three</option>
                  <option value="Four">Four</option>
                </Form.Select>
// =======
//                 <Form.Control
//                   className="text"
//                   type="text"
//                   value={this.state.level}
//                   onChange={this.onChangelevel}
//                 />
// >>>>>>> main
              </Form.Group>
            </div>

            <div className="formEdit">
              <h2>First Lession</h2>

              <Form.Group className="text1" controlId="subject1">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  className="text"
                  type="text"
                  value={this.state.subject1}
                  onChange={this.onChangesubject1}
                />
              </Form.Group>

              <Form.Group className="text1" controlId="lesson1">
                <Form.Label>Lesson</Form.Label>
                <Form.Control
                  className="text"
                  type="text"
                  value={this.state.lesson1}
                  onChange={this.onChangelesson1}
                />
              </Form.Group>

              <Form.Group className="text1" controlId="lesson1tutor">
                <Form.Label>Instructor</Form.Label>
                <Form.Control
                  className="text"
                  type="text"
                  value={this.state.lesson1tutor}
                  onChange={this.onChangelesson1tutor}
                />
              </Form.Group>
              <Form.Group className="text1" controlId="equipment">
                <Form.Label>Equipment</Form.Label>
                <Form.Control
                  className="text"
                  type="text"
                  value={this.state.equipment}
                  onChange={this.onChangeequipment}
                />
              </Form.Group>
              <Form.Group className="text1" controlId="dress">
                <Form.Label>Dress</Form.Label>
                <Form.Control
                  className="text"
                  type="text"
                  value={this.state.dress}
                  onChange={this.onChangedress}
                />
              </Form.Group>
            </div>
            <div className="formEdit">
              <h2> Second Lesson</h2>
              <Form.Group className="text1" controlId="subject2">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  className="text"
                  type="text"

                  value={this.state.lesson2tutor}
                  onChange={this.onChangelesson2tutor}
                />
              </Form.Group>
              <Form.Group className="text1" controlId="lesson2">
                <Form.Label>Lesson</Form.Label>
                <Form.Control
                  className="text"
                  type="text"
                  value={this.state.lesson2}
                  onChange={this.onChangelesson2}

                />
              </Form.Group>
              <Form.Group className="text1" controlId="lesson2tutor">
                <Form.Label>Instructor</Form.Label>


                <Form.Select
                  className="text"
                  selected={this.state.lesson2tutor}
                  onChange={this.onChangelesson2tutor}
                >
                  {this.state.values.map((obj) => {
                    return (
                      <option value={obj.Instructor}>{obj.firstname}</option>
                    );
                  })}
                </Form.Select>
// =======
//                 <Form.Control
//                   className="text"
//                   type="text"
//                   value={this.state.lesson2tutor}
//                   onChange={this.onChangelesson2tutor}
//                 />
// >>>>>>> main
              </Form.Group>
              <Form.Group className="text1" controlId="equipment">
                <Form.Label>Equipment</Form.Label>
                <Form.Control
                  className="text"
                  type="text"
                  value={this.state.equipment}
                  onChange={this.onChangeequipment}
                />
              </Form.Group>
              <Form.Group className="text1" controlId="dress">
                <Form.Label>Dress</Form.Label>
                <Form.Control
                  className="text"
                  type="text"
                  value={this.state.dress}
                  onChange={this.onChangedress}
                />
              </Form.Group>
            </div>
            <button className="btn_create" block="block" type="submit">
              Create Session
            </button>
          </Form>
        </div>
      </div>
    );
  }

}

