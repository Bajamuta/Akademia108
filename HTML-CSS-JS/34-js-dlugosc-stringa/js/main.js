let str1 = 'Uwielbiam JavaScript';
let str2 = 'Jestem świetną programistką';

function dluzszyString(s1, s2) {
    return s1.length > s2.length ? s1 : s2.length > s1.length ? s2 : 'Stringi mają jednakową długość';
}

console.log('Dłuższy string:', dluzszyString(str1, str2));

