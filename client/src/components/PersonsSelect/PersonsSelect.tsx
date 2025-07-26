import styles from "./PersonsSelect.module.css";
import { PersonsAvatar } from "../PersonsAvatar/PersonsAvatar";

const PERSONS = [
    "girl",
    "boy",
    "pencil",
    "dragon",
    "ninja",
    "goose",
    "professor",
];

interface PersonsSelectProps {
    disabledPersons?: string[];
    onSelect: (person: string) => void;
    selectedPerson?: string;
}

export const PersonsSelect = ({ disabledPersons, onSelect, selectedPerson }: PersonsSelectProps) => {
    return (
        <div className={styles.personsSelect}>
            {PERSONS.map((person) => (
                <PersonsAvatar
                    person={person}
                    disabled={disabledPersons?.includes(person)}
                    selected={selectedPerson === person}
                    onClick={() => onSelect(person)}
                />
            ))}
        </div>
    );
};
