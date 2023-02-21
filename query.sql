-------------trigger----------------

CREATE OR REPLACE FUNCTION update_counter()
  RETURNS trigger
AS $$
        BEGIN
            UPDATE department SET count_of_employess = count_of_employess + 1 where department_id = NEW.department_id;
                 RETURN NEW;
        END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER count_employees 
AFTER INSERT ON employees FOR EACH ROW 
EXECUTE PROCEDURE update_counter();


---------------function-----------------

create view myview 
as 
select row_to_json(t) as document
from (
  SELECT e.employee_id,
	e.first_name,
       e.last_name,
       e.department_id,
       d.department_name,
		e.created_at
FROM employees e,
     department d
WHERE e.department_id = d.department_id ORDER by e.created_at DESC
)t ;

create or replace function myfunc()
  returns table (document json) 
as $$
BEGIN
return query
  select row_to_json(myview) 
  from myview;
  END;
$$
language 'plpgsql';

select * 
from myfunc();

---------------------JOIN------------------

SELECT
emp.employee_id as employee_id,
  hod.hod_name AS head_of_department_name,
  dept.department_name as department_name
FROM
  Department dept
  INNER JOIN head_of_department hod ON hod.department_id = dept.department_id
  INNER JOIN employees emp ON emp.hod_id = hod.id;`;
