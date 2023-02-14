exports.getData = () => {
    var employeesView = `create or replace view myview 
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
    )t ;`
    
    var employeesFunction = `create or replace function myfunc()
      returns table (document json) 
    as $$
    BEGIN
    return query
      select row_to_json(${employeesView}) 
      from myview;
      END;
    $$
    language 'plpgsql';`
    
    var employeeData = `select * from ${employeesFunction};`
    
    return employeeData;
}