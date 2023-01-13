import axios from 'axios';
import React, { ReactNode } from 'react';
import './App.css';
import ErrorComponent from './components/Error/Error';
import Loading from './components/Loading/Loading';
import UserInfo from './components/Chart/UserInfo';

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      userName: '',
      tempUserName: '',
      correctQuestions: [],
      errorCode: 0,
      showCharts: false,
    }
  }

  cleanData = (data: any): void => {
    let cleanedArray: unknown[] = []
    let cleanedData = new Set();
    let n = data.length;

    for (let i = 0; i < n; i++) {
      if (data[i].verdict === 'OK') {
        if (!cleanedData.has(data[i].problem.contestId + data[i].problem.index)) {
          cleanedArray.push(data[i].problem)
          cleanedData.add(data[i].problem.contestId + data[i].problem.index)
        }
      }
    }

    this.setState({ ...this.state, correctQuestions: cleanedArray, showCharts: true });
  }

  submitUsername = (): void => {
    this.setState({ ...this.state, isLoading: true, errorCode: 0, showCharts: false, userName: this.state.tempUserName });
    let url = `https://codeforces.com/api/user.status?handle=${this.state.tempUserName}&from=1&count=10000`
    axios.get(url)
      .then((result) => {
        this.cleanData(result.data.result);
      })
      .catch((error) => {
        console.log(error);
        // console.log(this.state.)
        this.setState({ errorCode: error.response.status });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      })
  }

  _handleKeyboardEvent = (event: any): void => {
    if (event.key === 'Enter') {
      this.submitUsername();
    }
  }

  handleInput = (event: any): void => {
    this.setState({ tempUserName: event.target.value });
  }

  render(): ReactNode {
    return (
      <div className='main'>
        <div>
          <h1 className='banner'>Learn Intelligently</h1>
          <p className='description'>Use this tool to get a detailed analysis of your progress on Codeforces and use this knowledge to learn effectively by working on the topics that the most attention.</p>
          <div>
            <input type='text' className='inputBox' placeholder='User handle' onChange={this.handleInput} onKeyDown={this._handleKeyboardEvent}></input>
            <button className='goButton' onClick={this.submitUsername}>Go!</button>
          </div>
          <div className='attribution'>
            <a target='_blank' rel='noreferrer' href='https://github.com/Lawful2002'>&copy; Harshvardhan Singh</a>
          </div>
        </div>

        {this.state.errorCode !== 0 && <ErrorComponent code={this.state.errorCode}></ErrorComponent>}

        {this.state.isLoading && <Loading></Loading>}

        {
          this.state.showCharts &&
          <UserInfo
            array={this.state.correctQuestions}
            userName={this.state.userName}>
          </UserInfo>
        }

      </div>
    )
  }



}

export default App;
