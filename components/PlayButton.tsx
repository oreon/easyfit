import React from "react";
import { connect } from "react-redux";
import SecondaryButton from "./SecondaryIconButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Controller as AudioController } from "./Controller";

export class PlayButtonWrapped extends React.Component {
  state = {
    audioController: new AudioController(),
    audioFemaleReady: false,
    audioMaleReady: false,
    audioPlaying: false,
    autoPlayed: false,
  };

  componentDidMount() {
    this.initAudioClips();
  }

  componentDidUpdate(prevProps) {
    // if audio has changed, unmount the current audio clip and trigger reset
    if (prevProps.audioMale !== this.props.audioMale) {
      this.handleReplaceAudio();
    }

    // handle gender change
    if (prevProps.audioGender !== this.props.audioGender) {
      this.handleGenderChange();
    }
  }

  componentWillUnmount() {
    this.state.audioController.audioFemale.setOnPlaybackStatusUpdate(null);
    this.state.audioController.audioMale.setOnPlaybackStatusUpdate(null);
    this.state.audioController.cautiousResetAudioClips();
  }

  async handleReplaceAudio() {
    this.state.audioController.audioFemale.setOnPlaybackStatusUpdate(null);
    this.state.audioController.audioMale.setOnPlaybackStatusUpdate(null);
    this.state.audioController.resetAudioClips();

    this.setState({
      audioFemaleReady: false,
      audioMaleReady: false,
      audioPlaying: false,
      autoPlayed: false,
    });

    this.initAudioClips();
  }

  async handleGenderChange() {
    await this.state.audioController.stopAudio();
    this.state.audioController.playAudio(this.props.audioGender);
  }

  async initAudioClips() {
    // get data from props
    const { authToken, uriFemale, uriMale, audioGender, autoPlayAudio } =
      this.props;

    // await clips to load (from external endpoint)
    await this.state.audioController.loadClips(authToken, uriFemale, uriMale);

    // define female audio status update event listener
    this.state.audioController.audioFemale.setOnPlaybackStatusUpdate(
      ({ shouldPlay, isLoaded }) => {
        if (audioGender == "female") {
          this.setState({ audioPlaying: shouldPlay });
        }
        if (isLoaded) {
          this.setState({ audioFemaleReady: true });

          // handle auto play
          if (
            autoPlayAudio &&
            audioGender == "female" &&
            !this.state.autoPlayed
          ) {
            setTimeout(() => {
              this.state.audioController.audioFemale.playAsync();
              this.setState({ autoPlayed: true });
            }, 700);
          }
        }
      }
    );

    // define male audio status update event listener
    this.state.audioController.audioMale.setOnPlaybackStatusUpdate(
      ({ shouldPlay, isLoaded }) => {
        if (audioGender == "male") {
          this.setState({ audioPlaying: shouldPlay });
        }
        if (isLoaded) {
          this.setState({ audioMaleReady: true });

          // handle auto play
          if (
            autoPlayAudio &&
            audioGender == "male" &&
            !this.state.autoPlayed
          ) {
            setTimeout(() => {
              this.state.audioController.audioMale.playAsync();
              this.setState({ autoPlayed: true });
            }, 700);
          }
        }
      }
    );
  }

  render() {
    const { audioGender } = this.props;
    const { audioPlaying, audioController, audioFemaleReady, audioMaleReady } =
      this.state;

    return (
      <SecondaryButton
        icon={
          <Ionicons
            name={audioPlaying ? `ios-volume-high` : `ios-volume-mute`}
            size={20}
          />
        }
        label={audioPlaying ? `Playing` : `Listen`}
        onPress={async () => {
          if (audioPlaying) {
            await audioController.stopAudio();
            this.setState({
              audioPlaying: false,
            });
          } else {
            audioController.playAudio(audioGender);
            this.setState({
              audioPlaying: true,
            });
          }
        }}
        labelOpacity={!audioFemaleReady || !audioMaleReady ? 0.25 : 1}
        disabled={!audioFemaleReady || !audioMaleReady}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  autoPlayAudio: state.ui.autoPlayAudio,
  audioGender: state.ui.audioGender,
  authToken: state.auth.token,
});

const mapDispatchToProps = {};

export const PlayButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayButtonWrapped);

export default PlayButton;
