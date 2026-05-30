import { jest } from "@jest/globals";



// ✅ MOCK DB MODULE
jest.unstable_mockModule("../config/db.js", () => ({

  getPool: jest.fn(),

  sql: {}

}));



// IMPORT AFTER MOCKING
const { getPool } = await import("../config/db.js");

const {
  getDashboardStats
} = await import("../services/reportService.js");

describe("Dashboard Service Testing", () => {

  test("should return dashboard stats", async () => {

    // ✅ FAKE DB RESPONSE
    const mockQuery = jest.fn().mockResolvedValue({

      recordset: [
        {
          totalInwardQty: 1000,
          totalOutwardQty: 400,
          inwardCount: 50,
          outwardCount: 20
        }
      ]

    });




    // ✅ FAKE REQUEST OBJECT
    const mockRequest = {
      query: mockQuery
    };




    // ✅ FAKE POOL
    getPool.mockResolvedValue({

      request: () => mockRequest

    });




    // ✅ CALL SERVICE
    const result = await getDashboardStats();




    // ✅ ASSERTIONS
    expect(result.totalInwardQty).toBe(1000);

    expect(result.totalOutwardQty).toBe(400);

    expect(result.pendingStock).toBe(600);

    expect(result.inwardCount).toBe(50);

    expect(result.outwardCount).toBe(20);

  });

});

test("should throw error if database query fails", async () => {

  // ❌ FAKE DB FAILURE
  const mockQuery = jest.fn().mockRejectedValue(
    new Error("Database connection failed")
  );



  const mockRequest = {
    query: mockQuery
  };



  getPool.mockResolvedValue({

    request: () => mockRequest

  });




  // ✅ ASSERT ERROR
  await expect(

    getDashboardStats()

  ).rejects.toThrow("Database connection failed");

});