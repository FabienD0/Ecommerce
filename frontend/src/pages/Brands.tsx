import { Nav } from "react-bootstrap";
import Companies from "../components/utils/companies.json"
import { styled } from "styled-components";
import { colors } from "../assets/colors";

interface Company {
    name: string;
    url: string;
    country:string;
    _id: number
}

const Brands = () => {

const groupedCompanies: {[key:string]:Company[]} = {}

/* Group compagnies object */
Companies.forEach((company) => {
const firstLetter = company.name.charAt(0).toUpperCase();
if (!groupedCompanies[firstLetter]) {
    groupedCompanies[firstLetter] = [];
}
groupedCompanies[firstLetter].push(company)
})

/* Sort the letters alphabetically */
const sortedLetters: string[] = Object.keys(groupedCompanies).sort();

return (
    <div className="container pb-5">
      {sortedLetters.map((letter: string) => (
        <div key={letter}>
          <h2 className="border-bottom border-4 fw-bold">{letter}</h2>
          <div className="d-flex">
          {groupedCompanies[letter].map((company: Company) => (
            <NavStyled href={`/brand/${company._id}`} key={company._id} className="m-2">
              {company.name}
            </NavStyled>
          ))}
          </div>
        </div>
      ))}
    </div>
)
}

export default Brands

const NavStyled = styled(Nav.Link)`
&:hover {
    opacity: 0.7;
    color: ${colors.purple};
    cursor: pointer;
}
`