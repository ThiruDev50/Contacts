using App.Contacts.WebHost.Models.Data;

namespace App.Contacts.WebHost.Interfaces
{
    public interface IContactService
    {
        Task<List<Contact>> GetAllAsync();
        Task<Contact?> GetAsync(int id);
        Task<int> AddAsync(Contact contact);
        Task UpdateAsync(Contact contact);
        Task DeleteAsync(int id);
    }

}
