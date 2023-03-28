
function app(people) {
    displayWelcome();
    runSearchAndMenu(people);
    return exitOrRestart(people);
}

function displayWelcome() {
    alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
    const searchResults = searchPeopleDataSet(people);

    if (searchResults.length > 1) {
        DisplayPeople('Search Results', searchResults);
    }
    else if (searchResults.length === 1) {
        const person = searchResults[0];
        mainMenu(person, people);
    }
    else {
        alert('No one was found in the search.');
    }
}

function searchPeopleDataSet(people) {

    const searchTypeChoice = validatedPrompt(
        'Please enter in what type of search you would like to perform.',
        ['id', 'name', 'traits']
    );

    let results = [];
    switch (searchTypeChoice) {
        case 'id':
            results = searchById(people);
            break;
        case 'name':
            results = searchByName(people);
            break;
        case 'traits':
            results = searchByTraits(people);
            break;
        default:
            return searchPeopleDataSet(people);
    }

    return results;
}

function searchById(people) {
    const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
    const idToSearchForInt = parseInt(idToSearchForString);
    const idFilterResults = people.filter(person => person.id === idToSearchForInt);
    return idFilterResults;
}

function searchByName(people) {
    const firstNameToSearchFor = prompt('Please enter the first name of the person you are searching for.');
    const lastNameToSearchFor = prompt('Please enter the last name of the person you are searching for.');
    const fullNameSearchResults = people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() && person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()));
    return fullNameSearchResults;
}
function searchByTraits(people) {
    const searchTypeChoice = validatedPrompt(
        'Please enter in what type of trait search you would like to preform',
        ['gender', 'dob', 'height', 'weight', 'eyeColor', 'occupation']
    );

    let results = [];
    switch (searchTypeChoice) {
        case 'gender': 
            results = searchByGender(people);
            break;
        case 'dob': 
            results = searchByDob(people);
            break;
        case 'height':
            results = searchByHeight(people);
            break;
        case 'weight':
            results = searchByWeight(people);
            break;
        case 'eyeColor':
            results = searchByEyeColor(people);
            break;
        case 'occupation': 
            results = searchByOccupation(people);
            break;
        default:
            return searchByTraits(people);
    }
    return results;
}
function searchByGender(people) {
    const genderSearch = prompt ('Please enter the gender of the person you are searching for');
    const genderFilterResults = people.filter(person => (person.gender.toLowerCase() === genderSearch.toLocaleLowerCase()));
    return displayPeople('Results', genderFilterResults);
}

function searchByDob(people) {
    const dobSearch = ('Please enter the date of birth, formatted as 1/25/1929, you are searching for.');
    const dobFilterResults = people.filter(person => (person.dob === dobSearch));
    return displayPeople('Results', dobFilterResults);
}

function searchByHeight(people) {
    const heightSearch = prompt('Please enter height of the person you are searching for.');
    const heightSearchInt = parseInt(heightSearch);
    const heightFilterResults = people.filter(person => (person.height === heightSearchInt));
    return displayPeople('Results', heightFilterResults);
}

function searchByWeight(people) {
    const weightSearch = prompt('Please enter weight of the person you are searching for.');
    const weightSearchInt = parseInt(weightSearch);
    const weightFilterResults = people.filter(person => (person.weight === weightSearchInt));
    return displayPeople('Results', weightFilterResults);
}

function searchByEyeColor(people) {
    const eyeColorSearch = prompt ('Please enter the eye color of the person you are searching for');
    const eyeColorFilterResults = people.filter(person => (person.eyeColor.toLowerCase() === eyeColorSearch.toLocaleLowerCase()));
    return displayPeople('Results', eyeColorFilterResults);
}

function searchByOccupation(people) {
    const occupationSearch = prompt ('Please enter the occupation of the person you are searching for');
    const occupationFilterResults = people.filter(person => (person.occupation.toLowerCase() === occupationSearch.toLocaleLowerCase()));
    return displayPeople('Results', occupationFilterResults);
}


function mainMenu(person, people) {

    const mainMenuUserActionChoice = validatedPrompt(
        `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
        ['info', 'family', 'descendants', 'quit']
    );

    switch (mainMenuUserActionChoice) {
        case "info":
            //! TODO
            displayPersonInfo(person);
            break;
        case "family":
            //! TODO
            let personFamily = findPersonFamily(person, people);
            displayPeople('Family', personFamily);
            break;
        case "descendants":
            //! TODO
            let personDescendants = findPersonDescendants(person, people);
            displayPeople('Descendants', personDescendants);
            break;
        case "quit":
            return;
        default:
            alert('Invalid input. Please try again.');
    }

    return mainMenu(person, people);
}

function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
    alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}
function displayPersonInfo(person) {
    let personInfo = "Person Info\n";
    personInfo += `ID #: ${person.id}\n`
    personInfo += `First Name: ${person.firstName}\n`
    personInfo += `Last Name: ${person.lastName}\n`
    personInfo += `Gender: ${person.gender}\n`
    personInfo += `Date of Birth: ${person.dob}\n`
    personInfo += `Height: ${person.height}\n`
    personInfo += `Weight: ${person.weight}\n`
    personInfo += `Eye Color: ${person.eyeColor}\n`
    personInfo += `Occupation: ${person.occupation}\n`
    personInfo += `Parents: ${person.parents}\n`
    personInfo += `Current Spouse: ${person.currentSpouse}\n`;
    alert(personInfo)
}

function findPersonFamily(person, people) {
    let familyInfo = "Family Info\n";
    let spouse = findSpouse(person, people)
    familyInfo += `Spouse: ${spouse.firstName}\n`;
    let parents = findParents(person, people)
    familyInfo += `Parents: ${parents.firstName} \n`; 
    familyInfo += 'Descendants'
    alert(familyInfo)
}

function findSpouse(person = {}, people = []) {
    let spouseName = people.filter(function(element){
        if(element.id === person.currentSpouse) {
            return true
        }
        else {
            return false
        }
    })
    return spouseName[0];
}

function findParents(person, people) {
    let parentName = people.filter(function(element) {
        if(element.id === person.parents) {
            return true
        }
        else {
            return false
        }
    })
    return parentName[0,1]
}

function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = acceptableAnswers.map(aa => aa.toLowerCase());

    const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')}`;

    const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

    if (acceptableAnswers.includes(userResponse)) {
        return userResponse;
    }
    else {
        alert(`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')} \n\nPlease try again.`);
        return validatedPrompt(message, acceptableAnswers);
    }
}

function exitOrRestart(people) {
    const userExitOrRestartChoice = validatedPrompt(
        'Would you like to exit or restart?',
        ['exit', 'restart']
    );

    switch (userExitOrRestartChoice) {
        case 'exit':
            return;
        case 'restart':
            return app(people);
        default:
            alert('Invalid input. Please try again.');
            return exitOrRestart(people);
    }

}