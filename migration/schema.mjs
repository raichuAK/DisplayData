const createSchema = `
create table if not exists TreeData( 
  name varchar(25) constraint treedata_pk primary key,
  parent varchar(25),
  description varchar(1000)
);
`;

export default createSchema;
