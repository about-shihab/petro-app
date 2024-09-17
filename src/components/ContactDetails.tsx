import React from "react";
import { Contact } from "../utils/excelReader";

interface ContactDetailsProps {
  contact: Contact;
  onBack: () => void;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ contact, onBack }) => {
  return (
    <div className="contact-details">
      <button onClick={onBack}>Back</button>
      <h2>{contact.Name}</h2>
      <p>
        <strong>Designation:</strong> {contact.Designation}
      </p>
      <p>
        <strong>Company:</strong> {contact.Company}
      </p>
      <p>
        <strong>Joining Date:</strong> {contact.JoiningDate}
      </p>
      <p>
        <strong>Cadre:</strong> {contact.Cadre || "N/A"}
      </p>
      <p>
        <strong>Mobile:</strong>{" "}
        <a href={`tel:${contact.Mobile}`}>{contact.Mobile}</a>
      </p>
    </div>
  );
};

export default ContactDetails;
