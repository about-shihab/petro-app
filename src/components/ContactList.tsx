import React, { useState, useEffect } from "react";
import { readExcelFile, Contact } from "../utils/excelReader";
import ContactDetails from "./ContactDetails";

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          `${process.env.PUBLIC_URL}/data/data.xlsx`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        const fileBlob = await response.blob();

        // Validate file type using a more robust method (if necessary)
        // const fileType = await fileType.fromBuffer(fileBlob);
        // if (fileType.mime !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        //   throw new Error("File is not an Excel file");
        // }

        const contactsData = await readExcelFile(fileBlob);
        setContacts(contactsData);
        setFilteredContacts(contactsData);
      } catch (error) {
        console.error("Error loading contacts:", error);
        // Handle error gracefully (e.g., display a message to the user)
      }
    };

    fetchContacts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = contacts.filter((contact) => {
      const name =
        typeof contact.Name === "string" ? contact.Name.toLowerCase() : "";
      const mobile =
        typeof contact.Mobile === "string" ? contact.Mobile.toLowerCase() : "";
      const company =
        typeof contact.Company === "string"
          ? contact.Company.toLowerCase()
          : "";
      return (
        name.includes(searchTerm) ||
        mobile.includes(searchTerm) ||
        company.includes(searchTerm)
      );
    });
    setFilteredContacts(filtered);
  };

  const groupedContacts = filteredContacts.reduce((acc: any, contact) => {
    const company = contact.Company || "Unknown";
    if (!acc[company]) {
      acc[company] = [];
    }
    acc[company].push(contact);
    return acc;
  }, {});

  return (
    <div className="contact-list">
      {selectedContact ? (
        <ContactDetails
          contact={selectedContact}
          onBack={() => setSelectedContact(null)}
        />
      ) : (
        <>
          <input
            type="text"
            placeholder="Search by name, mobile, or company"
            value={searchTerm}
            onChange={handleSearch}
            className="search-bar"
          />
          <div className="timeline">
            {Object.keys(groupedContacts).map((company, index) => (
              <div key={index} className="timeline-group">
                <h3 className="company-name">{company}</h3>
                <ul>
                  {groupedContacts[company].map(
                    (contact: Contact, i: number) => (
                      <li
                        key={i}
                        className="contact-item"
                        onClick={() => setSelectedContact(contact)}
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/user-icon.png`}
                          alt="User Icon"
                          className="user-icon"
                        />
                        <span>
                          {contact.Name} - {contact.Mobile}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ContactList;
