let joinQuery = `SELECT
emp.employee_id as employee_id,
  hod.hod_name AS head_of_department_name,
  dept.department_name as department_name
FROM
  Department dept
  INNER JOIN head_of_department hod ON hod.department_id = dept.department_id
  INNER JOIN employees emp ON emp.hod_id = hod.id;`;

let functionQuery = `select * 
from myfunc();`

module.exports = {joinQuery, functionQuery};