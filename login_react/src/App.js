import React, { Component } from 'react';

import './App.css';
import './Css/login.css'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      db_gelen_kAdi: '',
      db_gelen_parola: '',
      users: [],
      txt_box_kAdi: '',
      txt_box_parola: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
 


  pageChange() {
    alert('Kayıt sayfasına yonlendiriliyorsun');
  }

  // veri tabanı işleri
  componentDidMount() {
    this.getUsers();
  }

  listenPort = 4001;
  getUsers = _ => {
    fetch('http://localhost:' + this.listenPort + '/showData')
      .then(response => response.json())
      .then(response => this.setState({
        users: response.data
      }))
      .catch(err => console(err))
  }

  handleChange(event) {
    if (event.target.id == 'kAdi_txt') {
      this.setState({ txt_box_kAdi: event.target.value });  // text boxtaki deger state atıldı
      //console.dir(event.target.value);
    }
    else if (event.target.id == 'parola_txt') {
      this.setState({ txt_box_parola: event.target.value });
    }
  }

  handleSubmit() {

    //console.log("txt_kadi : " + this.state.txt_box_kAdi + "  db_kadi : " + this.state.db_gelen_kAdi);
    console.log("txt_parola : " + this.state.txt_box_parola + "  db_parola : " + this.state.db_gelen_parola);
    if ((this.state.txt_box_kAdi == this.state.db_gelen_kAdi)
      && (this.state.txt_box_parola == this.state.db_gelen_parola)) {
      alert('giris basarılı');
    }
    else {
      alert('giris basarısız');
    }
  }

  renderUser = ({ kAdi, pass }) => (
    <div key={kAdi.toString()}>
      <h1>{this.state.db_gelen_kAdi = kAdi}</h1>
      <h2>{this.state.db_gelen_parola = pass}</h2>
    </div>
  )
  render() {

    const { users } = this.state;
    users.map(this.renderUser);
    return (
      <div className="App">
        <p onClick={this.pageChange} >Kayıt Ol</p>
        <form id="login_form">
          <input type="text" id="kAdi_txt" placeholder="Kullanıcı adı..." onChange={this.handleChange} />
          <br /><br />
          <input type="text" id="parola_txt" placeholder="Parola..." onChange={this.handleChange} />
          <br /><br />
          <input type="submit" value="Giris" onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}

export default App;
