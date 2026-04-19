# Modern Student Grade Calculator

A responsive dark-mode web app for calculating weighted student averages by high school level.

## Features

- Level selector for `TC`, `1BAC SM`, `1BAC SE`, `2BAC S PC`, and `2BAC SM`
- Automatic subject coefficients based on the selected level
- Weighted average calculation
- Final result summary
- Bar chart with Chart.js
- PDF report export
- Local storage save/restore
- Success and error messages
- Reset button
- Separate `HTML`, `CSS`, and `JavaScript` files

## Project Files

- `index.html`
- `styles.css`
- `script.js`

## How to Run

1. Open `index.html` directly in your browser.
2. Select a level.
3. Enter grades for each subject.
4. Click `Calculate Result` to see the weighted average and chart.
5. Click `Download PDF` to export the student report.

## Notes

- Grades are expected on a `0` to `20` scale.
- Student name is optional.
- The app saves the latest form data in `localStorage`.
- The coefficients used are embedded in `script.js` and can be adjusted if your school uses a different distribution.
