using App.Contacts.WebHost.Models.Data;

namespace App.Contacts.WebHost.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            if (!context.Contacts.Any())
            {
                var contacts = Enumerable.Range(1, 10).Select(i => new Contact
                {
                    FirstName = $"Contact {i}",
                    Email = $"contact{i}@mail.com",
                    Phone = $"123-456-78{i:D2}"
                }).ToList();

                context.Contacts.AddRange(contacts);
                context.SaveChanges();
            }
        }
    }

}
