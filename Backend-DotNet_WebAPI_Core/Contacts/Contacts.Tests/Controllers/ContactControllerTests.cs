using App.Contacts.WebHost.Controllers;
using App.Contacts.WebHost.Data;
using App.Contacts.WebHost.Interfaces;
using App.Contacts.WebHost.Models.Data;
using Microsoft.AspNetCore.Mvc;
using Moq;
namespace Contacts.Tests.Controllers
{
   

    [TestFixture]
    public class ContactControllerTests
    {
        private ContactController _controller;
        private Mock<IContactService> _mockService;

        [SetUp]
        public void SetUp()
        {
            _mockService = new Mock<IContactService>();
            _controller = new ContactController(_mockService.Object);
        }

        [Test]
        public async Task GetAll_ReturnsOkResult_WithListOfContacts()
        {
            // Arrange
            var contacts = new List<Contact>
        {
            new Contact { Id = 1, FirstName = "Thiru", Email = "thiru@example.com" },
            new Contact { Id = 2, FirstName = "Nila", Email = "nila@example.com" }
        };

            _mockService.Setup(service => service.GetAllAsync()).ReturnsAsync(contacts);

            // Act
            var result = await _controller.GetAll();

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.That(okResult.StatusCode, Is.EqualTo(200));
            Assert.That(okResult.Value, Is.EqualTo(contacts));
        }

        [Test]
        public async Task Get_ReturnsOkResult_WithContact_WhenContactExists()
        {
            // Arrange
            var contact = new Contact { Id = 1, FirstName = "Thiru", Email = "thiru@example.com" };
            _mockService.Setup(service => service.GetAsync(1)).ReturnsAsync(contact);

            // Act
            var result = await _controller.Get(1);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.That(okResult.StatusCode, Is.EqualTo(200));
            Assert.That(okResult.Value, Is.EqualTo(contact));
        }

        [Test]
        public async Task Get_ReturnsNotFound_WhenContactDoesNotExist()
        {
            // Arrange
            _ = _mockService.Setup(service => service.GetAsync(999)).ReturnsAsync((Contact)null);

            // Act
            var result = await _controller.Get(999);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [Test]
        public async Task Create_ReturnsOkResult_WithCreatedContactId()
        {
            // Arrange
            var contact = new Contact { FirstName = "Thiru", Email = "thiru@example.com" };
            var createdContactId = 1;
            _mockService.Setup(service => service.AddAsync(contact)).ReturnsAsync(createdContactId);

            // Act
            var result = await _controller.Create(contact);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.That(okResult.StatusCode, Is.EqualTo(200));
            Assert.That(okResult.Value, Is.EqualTo(createdContactId));
        }

        [Test]
        public async Task Update_ReturnsOkResult_WithUpdatedContact()
        {
            // Arrange
            var contact = new Contact { Id = 1, FirstName = "Thiru", Email = "thiru@example.com" };
            _mockService.Setup(service => service.UpdateAsync(contact)).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.Update(1, contact);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.That(okResult.StatusCode, Is.EqualTo(200));
            Assert.That(okResult.Value, Is.EqualTo(contact));
        }

        [Test]
        public async Task Delete_ReturnsNoContent_WhenContactDeleted()
        {
            // Arrange
            _mockService.Setup(service => service.DeleteAsync(1)).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.Delete(1);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
        }
    }




}
