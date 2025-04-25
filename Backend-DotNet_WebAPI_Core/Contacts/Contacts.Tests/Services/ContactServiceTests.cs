using App.Contacts.WebHost.Data;
using App.Contacts.WebHost.Interfaces;
using App.Contacts.WebHost.Models.Data;
using App.Contacts.WebHost.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contacts.Tests.Services
{
    [TestFixture]
    public class ContactServiceTests
    {
        private IContactService _contactService;

        [SetUp]
        public void SetUp()
        {
            // Mock the DbContext and set it up
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            var context = new AppDbContext(options); // In-memory context

            _contactService = new ContactService(context);
        }

        [Test]
        public async Task GetAllAsync_ReturnsListOfContacts()
        {
            // Arrange: Seed data into the in-memory database
            var contact = new Contact { FirstName = "thiru", Email = "thiru@example.com" };
            await _contactService.AddAsync(contact);

            // Act: Call GetAllAsync
            var contacts = await _contactService.GetAllAsync();

            // Assert: Verify results
            Assert.IsNotNull(contacts);
            Assert.That(contacts[contacts.Count - 1].FirstName, Is.EqualTo("thiru"));
        }
        [Test]
        public async Task AddAsync_CreatesContact()
        {
            // Arrange
            var contact = new Contact { FirstName = "thiru", Email = "thiru@example.com" };

            // Act
            await _contactService.AddAsync(contact);
            var createdContact = await _contactService.GetAsync(1);

            // Assert
            Assert.IsNotNull(createdContact);
            Assert.That(createdContact.FirstName, Is.EqualTo("thiru"));
        }
        [Test]
        public async Task GetAsync_ReturnsContact_WhenIdIsValid()
        {
            // Arrange: Seed data into the in-memory database
            var contact = new Contact { FirstName = "thiru", Email = "thiru@example.com" };
            var createdContactId= await _contactService.AddAsync(contact);

            // Act: Call GetAsync with a valid ID
            var result = await _contactService.GetAsync(createdContactId);

            // Assert: Verify the correct contact is returned
            Assert.IsNotNull(result);
            Assert.That(result.FirstName, Is.EqualTo("thiru"));
        }
        [Test]
        public async Task GetAsync_ReturnsNull_WhenIdIsInvalid()
        {
            // Act: Call GetAsync with an invalid ID
            var result = await _contactService.GetAsync(999);

            // Assert: Verify that null is returned when the contact doesn't exist
            Assert.IsNull(result);
        }
        [Test]
        public async Task UpdateAsync_UpdatesContact()
        {
            // Arrange: Seed data into the in-memory database
            var contact = new Contact { Id=1, FirstName = "thiru", Email = "thiru@example.com" };
            await _contactService.AddAsync(contact);

            // Act: Update contact's name
            contact.FirstName = "thiru updated";
            await _contactService.UpdateAsync(contact);
            var updatedContact = await _contactService.GetAsync(1);

            // Assert: Verify the contact is updated
            Assert.IsNotNull(updatedContact);
            Assert.That(updatedContact.FirstName, Is.EqualTo("thiru updated"));
        }
        [Test]
        public async Task DeleteAsync_DeletesContact_WhenIdIsValid()
        {
            // Arrange: Seed data into the in-memory database
            var contact = new Contact { FirstName = "thiru", Email = "thiru@example.com" };
            await _contactService.AddAsync(contact);

            // Act: Call DeleteAsync with a valid ID
            await _contactService.DeleteAsync(1);
            var deletedContact = await _contactService.GetAsync(1);

            // Assert: Verify the contact is deleted
            Assert.IsNull(deletedContact);
        }

    }
}
