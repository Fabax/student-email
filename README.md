## Fab app documentation

## files 
- only `.csv` accepted
- all cells should contains a value ( aka not blank)
- no blank rows and columns 

### student file 
` | klas  | mentor  | email  | lead  |`

- **klas** : the class name
- **mentor** : the mentor(s) first name. if there are several mentors, they should be sepaerated by a `,`. ex : `florian, Anne`
- **email** : the emails(s) for the mentor(s). if there are several emails, they should be sepaerated by a `,`. ex : `hello@lol.com, lol@hello.com`
- **lead** : the email added in cc, only 1 email us supported

## teacher file
`| voornaam  | achternaam  | klas  | a  | l  |`

- **voornaam** : student first name
- **achternaam** : student last name
- **klas** : class name
- **a** : hours of absence ( default value : `0`)
- **l** : hours being late ( default value : `0`)
