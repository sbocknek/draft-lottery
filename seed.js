var managersArr = [
    {
        firstName: "David",
        lastName: "Mandula",
        lastYearRank: 1,
        trades: 0,
        percentage: 0
    },
    {
        firstName: "Seth",
        lastName: "Bocknek",
        lastYearRank: 2,
        trades: 2,
        percentage: 0
    },
    {
        firstName: "Matin",
        lastName: "Fazelpour",
        lastYearRank: 3,
        trades: 0,
        percentage: 0
    },
    {
        firstName: "Andrew",
        lastName: "Carnovale",
        lastYearRank: 4,
        trades: 0,
        percentage: 0
    },
    {
        firstName: "Michael",
        lastName: "Spittal",
        lastYearRank: 5,
        trades: 1,
        percentage: 0
    },
    {
        firstName: "Michael",
        lastName: "Booth",
        lastYearRank: 6,
        trades: 1,
        percentage: 0
    },
    {
        firstName: "Alex",
        lastName: "Glidden",
        lastYearRank: 7,
        trades: 0,
        percentage: 0
    },
    {
        firstName: "Ryan",
        lastName: "Babington",
        lastYearRank: 8,
        trades: 0,
        percentage: 0
    },
    {
        firstName: "John",
        lastName: "Davies",
        lastYearRank: 9,
        trades: 2,
        percentage: 0
    },
    {
        firstName: "Connor",
        lastName: "Sziklasi",
        lastYearRank: 10,
        trades: 0,
        percentage: 0
    },
    {
        firstName: "Adam",
        lastName: "Levine",
        lastYearRank: 11,
        trades: 0,
        percentage: 0
    },
    {
        firstName: "No",
        lastName: "Name",
        lastYearRank: 12,
        trades: 0,
        percentage: 0
    }
];

// add fullName property to each object in managersArr
for (i = 0; i < managersArr.length; i++) {
    managersArr[i].fullName = managersArr[i].firstName + " " + managersArr[i].lastName;
}


const initialOddsBasedOnPrevRank = [0, 0, 0, 0, 0, 0, 0, 5, 10, 18, 28, 39];