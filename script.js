/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
  if (video.paused) {
    video.play(); 
  } else {
    video.pause();
  }
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

function handleRangeUpdate() {
  const val = parseFloat(this.value);
  video[this.name] = val;
}

function skip() {
  const delta = parseFloat(this.dataset.skip);
  const dur = isFinite(video.duration) ? video.duration : Infinity;
  const next = Math.max(0, Math.min((video.currentTime || 0) + delta, dur));
  video.currentTime = next;
}

function handleProgress() {
  const dur = video.duration || 0;
  const pct = dur ? (video.currentTime / dur) * 100 : 0;
  progressBar.style.flexBasis = `${pct}%`;
}

function scrub(e) {
  const dur = video.duration || 0;
  if (!dur) return;
  const scrubTime = (e.offsetX / progress.offsetWidth) * dur;
  video.currentTime = scrubTime;
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('ended', () => {
  updateButton();
  progressBar.style.flexBasis = '0%';
});

video.addEventListener('timeupdate', handleProgress);

ranges.forEach(r => {
  r.addEventListener('input', handleRangeUpdate);
  r.addEventListener('change', handleRangeUpdate);
});

skipButtons.forEach(btn => btn.addEventListener('click', skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
progress.addEventListener('mouseleave', () => (mousedown = false));
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));


