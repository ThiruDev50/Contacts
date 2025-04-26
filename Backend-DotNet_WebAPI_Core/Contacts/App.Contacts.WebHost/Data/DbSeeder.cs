using App.Contacts.WebHost.Models.Data;

namespace App.Contacts.WebHost.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            if (!context.Contacts.Any())
            {
                Random random = new Random();
                DateTime RandomDate() => DateTime.UtcNow.AddDays(-random.Next(0, 1000));
                DateTime RandomUpdatedDate(DateTime createdAt)
                {
                    var random = new Random();
                    return createdAt
                        .AddDays(random.Next(1, 100))
                        .AddHours(random.Next(0, 24))
                        .AddMinutes(random.Next(0, 60))
                        .AddSeconds(random.Next(0, 60));
                }

                var seedContacts = new List<Contact>
                {
                    new Contact { Id = 1, FirstName = "Thiru", LastName = "N", Email = "thiru@example.com", Phone = "9876543210", CountryId = "IN", CountryName = "India", CountryCode = "+91", Address = "Chennai, Tamil Nadu", Notes = "Loves classical music", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new Contact { Id = 2, FirstName = "Krishna", LastName = "Murthy", Email = "krishna.murthy@example.com", Phone = "9123456780", CountryId = "IN", CountryName = "India", CountryCode = "+91", Address = "Bengaluru, Karnataka", Notes = "Enjoys tech and coding", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new Contact { Id = 3, FirstName = "Nila", LastName = "Nidhi", Email = "nila.nidhi@example.com", Phone = "9988776655", CountryId = "IN", CountryName = "India", CountryCode = "+91", Address = "Madurai, Tamil Nadu", Notes = "Avid traveler", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new Contact { Id = 4, FirstName = "Radha", LastName = "Raman", Email = "radha.raman@example.com", Phone = "9654321789", CountryId = "US", CountryName = "United States", CountryCode = "+1", Address = "New York, USA", Notes = "Yoga enthusiast", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new Contact { Id = 5, FirstName = "Ibrahim", LastName = "Shaikh", Email = "ibrahim.shaikh@example.com", Phone = "9876123450", CountryId = "GB", CountryName = "United Kingdom", CountryCode = "+44", Address = "London, UK", Notes = "Food lover", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new Contact { Id = 6, FirstName = "Thomas", LastName = "George", Email = "thomas.george@example.com", Phone = "9012345678", CountryId = "AU", CountryName = "Australia", CountryCode = "+61", Address = "Sydney, Australia", Notes = "Soccer fan", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new Contact { Id = 7, FirstName = "Lakshmi", LastName = "Menon", Email = "lakshmi.menon@example.com", Phone = "9123567890", CountryId = "CA", CountryName = "Canada", CountryCode = "+10", Address = "Toronto, Canada", Notes = "Passionate dancer", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new Contact { Id = 8, FirstName = "Meera", LastName = "Rao", Email = "meera.rao@example.com", Phone = "9765432108", CountryId = "FR", CountryName = "France", CountryCode = "+33", Address = "Paris, France", Notes = "Bookworm", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new Contact { Id = 9, FirstName = "Sita", LastName = "Patel", Email = "sita.patel@example.com", Phone = "9345678123", CountryId = "JP", CountryName = "Japan", CountryCode = "+81", Address = "Tokyo, Japan", Notes = "Loves painting", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new Contact { Id = 10, FirstName = "Pooja", LastName = "Desai", Email = "pooja.desai@example.com", Phone = "9876541230", CountryId = "BR", CountryName = "Brazil", CountryCode = "+55", Address = "São Paulo, Brazil", Notes = "Fitness freak", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                };
                foreach (var contact in seedContacts)
                {
                    contact.CreatedAt = RandomDate();
                    contact.UpdatedAt = RandomUpdatedDate(contact.CreatedAt);
                }

                context.Contacts.AddRange(seedContacts);
                context.SaveChanges();
            }
        }
    }

}
