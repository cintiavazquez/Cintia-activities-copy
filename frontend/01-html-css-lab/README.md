# HTML/CSS Lab

This version of the page uses flex straight away.

- make the `body` flex/column;
- give `flex: 1` to the `<main>`;
- make the `.hero` another flex centered on both axes;

For the features:

- wrap them in a `.features-wrapper` with fixed width / `margin: x auto`;
- making it flex with `flex-wrap: wrap` achieves the layout;
- the single features have `flex: 50%` for the parent layout and are flexes on their own for their content. Observe how a grid layout would have spared that, but hey ho better than floats!

For mobile:

- give `flex: 100%;` to the single feature, below an opportune threshold;
- some fonts in the hero need adjustment too.