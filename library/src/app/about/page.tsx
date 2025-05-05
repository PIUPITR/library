"use client"; // Required for react-bootstrap components

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card"; // Example of using another Bootstrap component

export default function AboutPage() {
  return (
    <div>
      {/* Using Tailwind for heading */}
      <h1 className="text-3xl font-bold mb-4">About This Project</h1>

      {/* Using Tailwind for paragraph styling */}
      <p className="mb-4 text-gray-700">
        This application is a Book Library management system developed as part
        of a university project. It demonstrates the implementation of a
        full-stack web application using the MERN stack (MongoDB, Express - via
        Next.js API Routes, React, Node.js) within the Next.js framework.
      </p>

      {/* Example using react-bootstrap Accordion */}
      <Accordion defaultActiveKey="0" className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Project Requirements</Accordion.Header>
          <Accordion.Body>
            The project fulfills several requirements, including:
            <ul className="list-disc list-inside mt-2">
              <li>
                Multiple pages (Home, Books, Add Book, Edit Book, About, Book
                Detail)
              </li>
              <li>Navigation between pages</li>
              <li>CRUD operations (Create, Read, Update, Delete) for books</li>
              <li>MongoDB database integration</li>
              <li>RESTful API endpoints</li>
              <li>React frontend with client-side interactions</li>
              <li>Use of HTML elements like tables, lists, forms</li>
              <li>Basic SEO attributes</li>
              <li>
                Responsive design principles (using Tailwind CSS and Bootstrap)
              </li>
              <li>Integration of Bootstrap components</li>
              <li>
                Use of Flexbox/Grid for layout (inherent in Tailwind/Bootstrap)
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Technology Stack</Accordion.Header>
          <Accordion.Body>
            <ul className="list-disc list-inside">
              <li>Framework: Next.js (React)</li>
              <li>Backend: Next.js API Routes (Node.js/Express concepts)</li>
              <li>Database: MongoDB (with Mongoose ODM)</li>
              <li>Styling: Tailwind CSS & Bootstrap 5</li>
              <li>Language: TypeScript</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Example using react-bootstrap Card */}
      <Card>
        <Card.Header>Developer Note</Card.Header>
        <Card.Body>
          <Card.Title>Continuous Improvement</Card.Title>
          <Card.Text>
            This project serves as a learning exercise. Further improvements
            could include user authentication, more advanced search/filtering,
            image uploads for book covers, and enhanced styling.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
