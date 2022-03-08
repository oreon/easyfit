import { Audio } from "expo-av";

export class Controller {
  apiEndpoint = "https://<your_domain>/audio/load";
  audioFemale = new Audio.Sound();
  audioMale = new Audio.Sound();

  /* resetAudioClips
   * stops and unloads any existing audio clips asynchronously,
   * without blocking execution
   */
  resetAudioClips = async () => {
    this.audioFemale.unloadAsync();
    this.audioMale.unloadAsync();
  };

  /* cautiousResetAudioClips
   * stops and unloads any existing audio clips asynchronously,
   * fetching checking the audio state first.
   *  Also blocks execution until audio is unloaded.
   */
  cautiousResetAudioClips = async () => {
    let femaleStatus = await this.audioFemale.getStatusAsync();
    let maleStatus = await this.audioMale.getStatusAsync();

    if (femaleStatus.isLoaded === true) {
      await this.audioFemale.stopAsync();
      await this.audioFemale.unloadAsync();
    }

    if (maleStatus.isLoaded === true) {
      await this.audioMale.stopAsync();
      await this.audioMale.unloadAsync();
    }
  };

  /* loadClips
   * token: some authentication token to your API
   * uriFemale: the path to the requested female audio clip
   * uriMale: the path to the requested male audio clip
   *
   * example:
   * Controller.loadClips('s!ke9r3qie9au$2kl#d', '/audio/female/a_394.mp3', '/audio/male/a_394.mp3');
   */
  loadClips = async (token, uriFemale, uriMale) => {
    this.audioFemale.loadAsync(
      {
        uri: this.apiEndpoint,
        headers: {
          token: token,
          file: uriFemale,
        },
      },
      {
        shouldPlay: false,
        volume: 1,
      }
    );

    this.audioMale.loadAsync(
      {
        uri: this.apiEndpoint,
        headers: {
          token: token,
          file: uriMale,
        },
      },
      {
        shouldPlay: false,
        volume: 1,
      }
    );
  };

  /* playAudioplay
   * play audio by gender
   */
  playAudio = async (gender) => {
    if (gender == "female") {
      this.audioFemale.replayAsync();
    } else {
      this.audioMale.replayAsync();
    }
  };

  /* stopAudio
   * stops all audio
   */
  stopAudio = async () => {
    await this.audioFemale.stopAsync();
    await this.audioMale.stopAsync();
  };
}
