using FullStack.API.Data;
using FullStack.API.Models;
using FullStack.API.Models.LoyaltyCust;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;


namespace FullStack.API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]

    public class LoyaltyCustController : Controller
    {
        private readonly FullStackDbContext _loyaltyCusDbContext;
        public LoyaltyCustController(FullStackDbContext loyaltyCusDbContext)
        {
            _loyaltyCusDbContext = loyaltyCusDbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllLoyaltyCust()
        {
            var loyalCust = await _loyaltyCusDbContext.LoyaltyCusts.OrderByDescending(c => c.CustID).ToListAsync();
            return Ok(loyalCust);
        }

        [HttpPost]
        public async Task<IActionResult>AddLoyaltyCust([FromBody] LoyaltyCust request)
        {
            if (ModelState.IsValid)
            {
                Console.WriteLine("Received data:");
                Console.WriteLine($"CustID: {request}");
                await _loyaltyCusDbContext.LoyaltyCusts.AddAsync(request);
               await _loyaltyCusDbContext.SaveChangesAsync();
                return Ok(request);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        [Route("{id:decimal}")]
        public async Task<IActionResult> UpdateLoyaltyCust([FromRoute] decimal id, LoyaltyCust request)
        {
            var employee = await _loyaltyCusDbContext.LoyaltyCusts.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            //employee.CustID = request.CustID;
            employee.Email = request.Email;
            employee.CustName = request.CustName;
            employee.CustType = request.CustType;
            employee.AppTime = request.AppTime;
            employee.IssueDate = request.IssueDate;
            employee.CreatDate = request.CreatDate;
            employee.RefNo = request.RefNo;
            employee.CardNo = request.CardNo;
            employee.Add1 = request.Add1;
            employee.Add2 = request.Add2;
            employee.Add3 = request.Add3;
            employee.IsIssued = request.IsIssued;
            employee.CollectionType = request.CollectionType;
            employee.HomePhone = request.HomePhone;
            employee.MobilePhone = request.MobilePhone;
            employee.NamePrintOnCard = request.NamePrintOnCard;
            employee.IsPrint = request.IsPrint;
            employee.PrintTime = request.PrintTime;
            await _loyaltyCusDbContext.SaveChangesAsync();
            return Ok(employee);
        }
        [HttpDelete]
        [Route("{id:decimal}")]
        public async Task<IActionResult> DeleteLoyalty([FromRoute] decimal id)
        {
            var employee = await _loyaltyCusDbContext.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            _loyaltyCusDbContext.Employees.Remove(employee);
            await _loyaltyCusDbContext.SaveChangesAsync();
            return Ok(employee);
        }


    }
}
