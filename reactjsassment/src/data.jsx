export const clients = [
  { id: "c1", name: "Acme Corp" },
  { id: "c2", name: "Globex Inc" },
];
export const reqsByClient = {
  c1: [
    {
      id: "r1",
      title: "Frontend Developer",
      talents: [
        { id: "t1", name: "Alice", stage: "Shortlisted" },
        { id: "t2", name: "Bob", stage: "Interviewed" },
        { id: "t3", name: "Charlie", stage: "Shortlisted" },
      ],
    },
    {
      id: "r2",
      title: "Backend Developer",
      talents: [
        { id: "t4", name: "David", stage: "Shortlisted" },
        { id: "t5", name: "Eva", stage: "Offer" },
      ],
    },
  ],
  c2: [
    {
      id: "r3",
      title: "Fullstack Developer",
      talents: [
        { id: "t6", name: "Frank", stage: "Shortlisted" },
        { id: "t7", name: "Grace", stage: "Interviewed" },
      ],
    },
  ],
};
export const currencies = ["INR", "USD", "EUR"];
