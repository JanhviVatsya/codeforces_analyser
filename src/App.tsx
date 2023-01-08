import React, { ReactNode } from 'react';
import './App.css';

class App extends React.Component {
  render(): ReactNode {
    return (
      <div className='main'>
        <h1 className='banner'>Learn Intelligently</h1>
        <p className='description'>Use this tool to get a detailed analysis of your progress on Codeforces and use this knowledge to learn effectively by working on the topics that the most attention.</p>
        <form>
          <input type='text' className='inputBox'></input>
          <button type='submit' className='goButton'>Go!</button>
        </form>
        <div className='attribution'>
          <a target='_blank' rel='noreferrer' href='https://github.com/Lawful2002'>&copy; Harshvardhan Singh</a>          
        </div>
      </div>
    )
  }
}

export default App;
