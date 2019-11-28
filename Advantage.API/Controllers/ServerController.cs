using System.Linq;
using Advantage.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Advantage.API.Controllers
{
    [Route("api/[controller]")]
    public class ServerController : Controller
    {
        private readonly ApiContext _ctx;
        
        public ServerController(ApiContext ctx)
        {
            _ctx = ctx;
        }
        
        [HttpGet("{id}", Name="GetServer")]
        public IActionResult Get(int id)
        {
            var response = _ctx.Servers.Find(id);
            return Ok(response);
        }
        [HttpPut("{id}")]
        public IActionResult Message(int id, [FromBody] ServerMessage msg)
        {
            var server = _ctx.Servers.Find(id);
            if(server == null)
            {
                return NotFound();
            }
            //Refactor: move into a service
            if(msg.Payload == "activate")
            {
                server.isOnline = true;
                _ctx.SaveChanges();
            }

            if(msg.Payload == "deactivate")
            {
                server.isOnline = false;
            }
            _ctx.SaveChanges();
            return new NoContentResult();
        }
    }
}