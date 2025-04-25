using App.Contacts.WebHost.Interfaces;
using App.Contacts.WebHost.Models.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace App.Contacts.WebHost.Controllers
{
    /// <summary>
    /// Controller class for managing Contact API endpoints.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _service;

        /// <summary>
        /// Initializes the ContactController with the specified ContactService.
        /// </summary>
        public ContactController(IContactService service)
        {
            _service = service;
        }

        /// <summary>
        /// Retrieves all contacts from the database.
        /// </summary>
        /// <returns>List of all contacts.</returns>
        [HttpGet("/api/Contacts")]
        public async Task<IActionResult> GetAll()
        {
            var contacts = await _service.GetAllAsync();
            return Ok(contacts);
        }

        /// <summary>
        /// Retrieves a specific contact by its ID.
        /// </summary>
        /// <param name="id">The ID of the contact to retrieve.</param>
        /// <returns>The contact if found; otherwise, a 404 Not Found response.</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var contact = await _service.GetAsync(id);
            if (contact == null) return NotFound();
            return Ok(contact);
        }

        /// <summary>
        /// Creates a new contact in the database.
        /// </summary>
        /// <param name="contact">The contact object to create.</param>
        /// <returns>A response indicating the result of the creation.</returns>
        [HttpPost]
        public async Task<IActionResult> Create(Contact contact)
        {
            var createdContactId = await _service.AddAsync(contact);
            return Ok(createdContactId);
        }

        /// <summary>
        /// Updates an existing contact in the database.
        /// </summary>
        /// <param name="id">The ID of the contact to update.</param>
        /// <param name="contact">The contact object with updated data.</param>
        /// <returns>The updated contact object.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Contact contact)
        {
            contact.Id = id; // To handle if different id is being sent
            await _service.UpdateAsync(contact);
            return Ok(contact);
        }

        /// <summary>
        /// Deletes a contact by its ID.
        /// </summary>
        /// <param name="id">The ID of the contact to delete.</param>
        /// <returns>A 204 No Content response if successful.</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }


}
