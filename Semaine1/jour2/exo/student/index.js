require('dotenv').config();

const students = [
    { name: 'ALAN', note: '11', address: 'Paris', mention : null },
    { name: 'ALICE', note: '17', address: 'Paris', mention : null },
    { name: 'SOHPHIE', note: '20', address: 'Paris', mention : null },
    { name: 'SONIA', note: '17', address: 'Toulon', mention : null },
    { name: 'ANTOINE', note: '18', address: 'Aubenas', mention : null },
    { name: 'BERNARD', note: '19', address: 'Paris', mention : null },
    { name: 'ALAN', note: '14', address: 'Aubenas', mention : null },
    { name: 'SONIA', note: '18', address: 'Paris', mention : null },
    { name: 'CLARISSE', note: '17', address: 'Marseille', mention : null }
  ];


students.forEach((student) => {
    const moyenne = parseFloat(student.note);
    
    if (moyenne >= 12 && moyenne < 14) {
      student.mention = process.env.MENTION_ASSEZ_BIEN;
    } else if (moyenne == 14 && moyenne < 16) {
      student.mention = process.env.MENTION_BIEN;
    } else if (moyenne >= 16) {
      student.mention = process.env.MENTION_TRES_BIEN;
    } else {
      student.mention = process.env.PASSABLE;
    }
  });

console.log(students)
