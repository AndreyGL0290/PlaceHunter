const button = document.getElementsByClassName('plus-button')[0];

button.addEventListener('click', function (e) {
    e.preventDefault();
    request = new XMLHttpRequest;
    request.open('POST', '/account', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        let cards_container = document.getElementsByClassName('cards-container')[0];
        
        let card = document.createElement('div');
        card.classList.add('card');
    
        let label_1 = document.createElement("label");
        let label_2 = document.createElement("label");
    
        label_1.classList.add("card-label");
        label_2.classList.add("card-label");
    
        label_1.textContent = "Вид спорта";
        label_2.textContent = "Уровень игры";
    
        let input_1 = document.createElement("input");
        let input_2 = document.createElement("input");
    
        input_1.classList.add("card-input");
        input_2.classList.add("card-input");
    
        label_1.appendChild(input_1);
        label_2.appendChild(input_2);
    
        card.appendChild(label_1);
        card.appendChild(label_2);
    
        cards_container.appendChild(card);
    })

    request.send(JSON.stringify({ newPref: true }));

})