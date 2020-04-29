import React, { Component } from 'react';
import './Metronome.css';
import click1 from './sounds/click1.wav';
import click2 from './sounds/click2.wav';

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4,
      volume: 5
    };
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  handleBpmChange = event => {
    const bpm = event.target.value;
    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
      this.setState({
        count: 0,
        bpm
      });
    } else {
      this.setState({ bpm });
    }
  };

  handleBeatsPerMeasureChange = event => {
    const beatsPerMeasure = event.target.value;
    this.setState({ beatsPerMeasure });
  }

  handleVolumeChange = event => {
    const volume = event.target.value;
    this.setState({ volume });
  }

  startStop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState({
          count: 0,
          playing: true
        },
        this.playClick
      );
    }
  }

  playClick = () => {
    const { count, beatsPerMeasure, volume } = this.state;
    this.click2.volume = volume/10;
    this.click1.volume = volume/10;
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else { 
      this.click1.play();
    }
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };

  render() {
    const { playing, bpm, beatsPerMeasure, volume } = this.state;
    return (
      <div className="metronome">
        <h1 className='title'>
          Metronome
        </h1>
        <div className='device'>
          <div className='slider bpm-slider'>
            <div>{bpm} BPM</div>
            <input 
              type='range' 
              min='60' 
              max='240' 
              value={bpm} 
              onChange={this.handleBpmChange} />
          </div>
          <div className='slider beatsPerMeasure-slider'>
            <div>{beatsPerMeasure} Beats per Measure</div>
            <input 
              type='range'
              min='1'
              max='30'
              value={beatsPerMeasure}
              onChange={this.handleBeatsPerMeasureChange} />
          </div>
          <div className='slider volume-slider'>
            <div>Volume: {volume}</div>
            <input 
              type='range'
              min='0'
              max='10'
              value={volume}
              onChange={this.handleVolumeChange} />
          </div>
          <button onClick={this.startStop}>
            {playing ? 'Stop' : 'Start'}
          </button>
        </div>        
      </div>
    );
  }
}

export default Metronome;
