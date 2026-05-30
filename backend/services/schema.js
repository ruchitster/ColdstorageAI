export const schema = `
DATABASE SCHEMA:

Table: Inward | Column: InwardID (bigint)
Table: Inward | Column: Cdate (datetime)
Table: Inward | Column: ClientName (nvarchar)
Table: Inward | Column: Status (nchar)

Table: InwardDet | Column: InwardID (bigint)
Table: InwardDet | Column: ProductID (bigint)
Table: InwardDet | Column: ProductName (nvarchar)
Table: InwardDet | Column: Qty (float)
Table: InwardDet | Column: Unit (float)
Table: InwardDet | Column: status (nchar)

Table: Outward | Column: OutID (bigint)
Table: Outward | Column: Cdate (datetime)
Table: Outward | Column: ClientName (nvarchar)
Table: Outward | Column: Status (nchar)

Table: OutwardDet | Column: OutID (bigint)
Table: OutwardDet | Column: InwardID (bigint)
Table: OutwardDet | Column: ProductName (nvarchar)
Table: OutwardDet | Column: Qty (float)
Table: OutwardDet | Column: Unit (float)
Table: OutwardDet | Column: status (nchar)

RULES:
- Always use TOP 5 for latest data
- Order latest data using InwardID DESC or OutID DESC
- Always filter Status = 'YES' where applicable
`;