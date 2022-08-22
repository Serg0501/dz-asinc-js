const buttonAllUsers = document.getElementById('allUsers');
const buttonMale = document.getElementById('maleUsers');
const buttonFemale = document.getElementById('femaleUsers');
const mainConteiner = document.getElementById('mainConteiner');

const db = {
    users: null,
    isFetching: false,
    error: null,
};

buttonAllUsers.onclick = function () {
    fetch('https://randomuser.me/api/?results=10&inc=name,picture,gender,dob,location')
            .then(loadResolve)
            .then(logData);
};

buttonMale.onclick = function () {
    fetch('https://randomuser.me/api/?results=5&inc=name,picture,gender,dob,location&gender=male')
            .then(loadResolve)
            .then(logData);
};

buttonFemale.onclick = function () {
    fetch('https://randomuser.me/api/?results=5&inc=name,picture,gender,dob,location&gender=female')
            .then(loadResolve)
            .then(logData);
};


function loadResolve(response){
    db.isFetching = true;
    return response.json();
};

function logData(data){
    db.isFetching = false;
    db.users = data.results;

    console.log(db.users);

    for (let i = 0; i < db.users.length; i++) {
        
        let li = document.createElement('li');
        mainConteiner.appendChild(li);
        
        let imgConteiner = document.createElement('div');
        imgConteiner.classList.add('imgConteiner');

        let img = document.createElement('img');
        img.setAttribute('src',db.users[i].picture.medium);
        imgConteiner.appendChild(img);
        li.appendChild(imgConteiner);

        let name = document.createElement('h3');
        name.innerHTML = db.users[i].name.title + ' ' + db.users[i].name.first + ' ' + db.users[i].name.last ;
        li.appendChild(name);

        let location = document.createElement('h4');
        location.innerHTML = 'Location:' + db.users[i].location.country;
        li.appendChild(location);

        let age = document.createElement('h5');
        age.innerHTML = 'Age:' + db.users[i].dob.age;
        li.appendChild(age);
    };
};