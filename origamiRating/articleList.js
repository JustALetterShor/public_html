//big list that stores the data for each article
//title, html for article, tags
const articles = [
    ['Crane', 
    `<img src="https://tie.usprogramming8.com/articles/5723.jpg" alt="Paper Crane">
    <div id="tags">
    <p class="tag" id="difficulty"></p>
    <p class="tag" id="paper shape"></p>
    <p class="tag" id="base"></p>
    </div>
    <p> The Paper Crane is a classic of origami. A symbol of peace, it is by far the best known origami model. </p>
    <p>A traditional Japanese belief holds that if you fold a thousand cranes, any wish that you make will come true. </p>
    <br>
    <h3>Instructions</h3>
    <small>If you don't know how to do something in these instructions, check out the cheatsheet at the bottom of this page.</small>
    <p>Begin with a bird base. </p><p>From there, fold the edges bottom flaps inward to the center crease. Repeat on the other side.</p>
    <p>Perform an inside reverse fold on the bottom flap. Repeat on the other flap.</p><p>Do another inside reverse fold on just one of the flaps.</p>
    <p>Fold down the wings as far as they can go.</p><p>You now have your completed crane!</p>`
    , 'easy', '1:1', 'bird', 'animal'],
    ['Swan', 
    `instructions`,
     'very easy', '1:1', 'kite', 'animal'],
     ['Butterfly', 
    `instructions`,
     'very easy', '1:1', 'windmill', 'animal'],
     ['Fish', 
    `instructions`,
     'easy', '1:1', 'windmill', 'animal'],
     ['Rabbit', 
    `instructions`,
     'easy', '1:1', 'cupboard', 'animal'],
     ['Frog', 
    `instructions`,
     'easy', '1:1', 'frog', 'animal'],
    // ... add all other articles here
];

function getArticleList(){
    return articles;
}

export default getArticleList;