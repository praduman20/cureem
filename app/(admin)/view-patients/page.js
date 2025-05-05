"use client";

import { useUser } from "@clerk/nextjs";
import { useLiveQuery } from "@electric-sql/pglite-react";

function ViewPatients() {
  const { user } = useUser();
  const patients = useLiveQuery.sql`
    SELECT *
    FROM patients
    WHERE userId = ${user?.id}
    ORDER BY id;
  `;

  return (
    <div className="flex-1 p-10 pb-20">
      <h1
        className="text-xl lg:text-3xl font-semibold mb-5"
        style={{
          color: "#F4A261",
          textShadow: "1px 1px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        Active Registered Patients - {patients?.rows.length}
      </h1>
      <ul className="flex flex-col space-y-5">
        {patients?.rows.map((patient) => (
          <li
            key={patient.id}
            className="bg-[#FFF8F1] border border-[#F4A261] rounded-xl shadow-md p-5 transition hover:shadow-lg"
          >
            <h2 className="text-xl font-bold text-[#F4A261] mb-3">
              {patient.firstname} {patient.lastname}
            </h2>
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <span className="font-medium text-[#F4A261]">DOB:</span>{" "}
                {patient.dateofbirth}
              </p>
              <p>
                <span className="font-medium text-[#F4A261]">Age:</span>{" "}
                {patient.age}
              </p>
              <p>
                <span className="font-medium text-[#F4A261]">Gender:</span>{" "}
                {patient.gender}
              </p>
              <p>
                <span className="font-medium text-[#F4A261]">Phone:</span>{" "}
                {patient.phonenumber}
              </p>
              <p>
                <span className="font-medium text-[#F4A261]">Email:</span>{" "}
                {patient.email}
              </p>
              <p>
                <span className="font-medium text-[#F4A261]">Address:</span>{" "}
                {patient.address}
              </p>
              <p>
                <span className="font-medium text-[#F4A261]">Symptoms:</span>{" "}
                {patient.symptons}
              </p>
              {patient.notes && (
                <p>
                  <span className="font-medium text-[#F4A261]">Notes:</span>{" "}
                  {patient.notes}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewPatients;
