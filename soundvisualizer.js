// Global variables (no class, so we store state here)
let audioSource, amplitude, fft, currentPreset = "waveform";

// Initialize the audio source (mic or file)
function setupSoundVisualizer(source) {
  audioSource = source;
  amplitude = new p5.Amplitude();
  fft = new p5.FFT();
  amplitude.setInput(audioSource);
  fft.setInput(audioSource);
}

// Set the current preset
function setVisualizerPreset(presetName) {
  currentPreset = presetName;
}

// Main draw function to call in sketch
function drawSoundVisualizer() {
  let level = amplitude.getLevel(); // Volume (0 to 1)
  let spectrum = fft.analyze();     // Frequency array

  if (currentPreset === "waveform") {
    drawWaveform(level);
  } else if (currentPreset === "particles") {
    drawParticles(spectrum);
  }
}

// Preset: Waveform
function drawWaveform(level) {
  stroke(255);
  noFill();
  beginShape();
  for (let i = 0; i < width; i++) {
    let y = map(level, 0, 1, height / 2, height / 4); // Scale amplitude
    vertex(i, height / 2 + sin(i * 0.05 + frameCount * 0.1) * y);
  }
  endShape();
}

// Preset: Particles
function drawParticles(spectrum) {
  noStroke();
  fill(255, 150, 150);
  for (let i = 0; i < 50; i++) {
    let freq = spectrum[i * 5]; // Sample frequencies
    let size = map(freq, 0, 255, 5, 20);
    let x = random(width);
    let y = random(height);
    ellipse(x, y, size, size);
  }
}