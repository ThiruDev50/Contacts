using App.Contacts.WebHost.Data;
using App.Contacts.WebHost.Interfaces;
using App.Contacts.WebHost.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace App.Contacts.WebHost.Services
{
    /// <summary>
    /// Service class for managing Contact entities.
    /// </summary>
    public class ContactService : IContactService
    {
        private readonly AppDbContext _context;

        /// <summary>
        /// Initializes the ContactService with the specified DbContext.
        /// </summary>
        public ContactService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Retrieves all contacts from the database.
        /// </summary>
        public async Task<List<Contact>> GetAllAsync()
        {
            return await _context.Contacts
               .OrderBy(c => c.FirstName + " " + c.LastName)
               .ToListAsync();
        }

        /// <summary>
        /// Retrieves a specific contact by its ID. If it is not there, null will be return
        /// </summary>
        public async Task<Contact?> GetAsync(int id)
        {
            return await _context.Contacts.FindAsync(id);
        }

        /// <summary>
        /// Adds a new contact to the database.
        /// </summary>
        public async Task<int> AddAsync(Contact contact)
        {
            contact.UpdatedAt = DateTime.Now;
            contact.CreatedAt = DateTime.Now;
            await _context.Contacts.AddAsync(contact);
            await _context.SaveChangesAsync();
            return contact.Id;
        }

        /// <summary>
        /// Updates an existing contact in the database.
        /// </summary>
        public async Task UpdateAsync(Contact contact)
        {
            contact.UpdatedAt = DateTime.Now;
            _context.Contacts.Update(contact);
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Deletes a contact by its ID, if found.
        /// </summary>
        public async Task DeleteAsync(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact != null)
            {
                _context.Contacts.Remove(contact);
                await _context.SaveChangesAsync();
            }
        }
    }



}
